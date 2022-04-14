const {FacebookChat} = require("models/facebook-chat/FacebookChat")
const {FacebookChatMessage} = require("models/facebook-chat/FacebookChatMessage")
const {facebookClient} = require("config/facebook.config")
const {io} = require("config/socket.config")
const moment = require("moment")

const sendSocketCount = async () => {
    const count = await FacebookChatMessage.query().where({read_at: null, user_id: null})
    io.emit("count_new_messages", count.length)
}

/**
 * Отправка сообщение если первое сообщение
 * @param chatId
 * @param facebookClientId
 * @returns {Promise<void>}
 */
const sendAutoMessageIfFirstMessage = async (chatId, facebookClientId) => {
    const messages = await FacebookChatMessage.query().where({chat_id: chatId}).count("id as id")
    if (!(messages.length && messages[0].id > 0))
        await facebookClient.sendText(String(facebookClientId), `Здравствуйте, менеджер скоро свяжется с вами!`)
}

/**
 *
 * @returns {Promise<this>}
 */
const findAndCreateChatByFacebookClientId = async (clientId) => {
    // Существует чат
    let chat = await FacebookChat.query().findOne({facebook_client_id: clientId})
    if (!chat) {
        const facebookClientDetails = await facebookClient.getUserProfile(clientId)
        chat = await FacebookChat.query().insert({
            facebook_client_id: clientId,
            facebook_client: facebookClientDetails
        })
    }
    return chat
}

/**
 * Обновить сообщение
 * @param clientId
 * @param watermark
 * @param update
 * @returns {Promise<void>}
 */
const updateMessageByClientId = async (clientId, watermark, update) => {
    let chat = await FacebookChat.query().findOne({facebook_client_id: clientId})
    if (chat) {
        // Сохранение сообщения
        const message = await FacebookChatMessage.query()
            .findOne({
                chat_id: chat.id,
                send_timestamp: watermark
            })
        const selectMessage = await message.$query().updateAndFetch(update)
        io.emit(`chat_${chat.id}`, selectMessage)
    }
}

/**
 * Вебхук
 * @param req
 * @param res
 * @returns {*}
 * @constructor
 */
const Webhook = async (req, res) => {
    try {
        const body = req.body
        if (body.object === "page") {
            Promise.all(
                body.entry.map(async function(entry) {
                    // Сообщение
                    let webhookEvent = entry.messaging[0]
                    // Отправитель
                    let senderPsid = webhookEvent.sender.id
                    // Получатель
                    let recipientPsid = webhookEvent.recipient?.id

                    if (senderPsid === process.env.FACEBOOK_CHAT_ID) {
                        // Отравлено
                        if ("message" in webhookEvent) {
                            // Существует чат
                            let chat = await findAndCreateChatByFacebookClientId(recipientPsid)
                            // Сохранение сообщения
                            const message = await FacebookChatMessage.query().insert({
                                chat_id: chat.id,
                                user_id: process.env.FACEBOOK_APP_ID,
                                message: webhookEvent.message.text,
                                send_timestamp: webhookEvent.timestamp
                            })
                            io.emit(`chat_${chat.id}`, message)
                        }
                    } else {
                        if ("message" in webhookEvent) {
                            // Существует чат
                            let chat = await findAndCreateChatByFacebookClientId(senderPsid)

                            // Проверка на первое сообщение в чате
                            await sendAutoMessageIfFirstMessage(chat.id, senderPsid)

                            // Сохранение сообщения
                            const message = await FacebookChatMessage.query().insert({
                                chat_id: chat.id,
                                message: webhookEvent.message.text,
                                send_timestamp: webhookEvent.timestamp
                            })
                            io.emit(`chat_${chat.id}`, message)
                        }

                        //
                        await sendSocketCount()

                        // Доставлено
                        if ("delivery" in webhookEvent)
                            await updateMessageByClientId(senderPsid, webhookEvent.delivery.watermark, {
                                delivered_at: moment().format("YYYY-MM-DD HH:mm:ss")
                            })
                        // Прочитано
                        else if ("read" in webhookEvent)
                            await updateMessageByClientId(senderPsid, webhookEvent.read.watermark, {
                                read_at: moment().format("YYYY-MM-DD HH:mm:ss")
                            })

                    }
                })
            )
            return res.status(200).send("EVENT_RECEIVED")
        } else {
            return res.sendStatus(404)
        }
    } catch (e) {
        return res.sendStatus(500)
    }
}

/**
 * Вывод всех чатов
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const chats = await FacebookChat.query()
            .select(
                "*",
                FacebookChat.relatedQuery("new_messages")
                    .count()
                    .as("count_new_messages")
            )
            .withGraphFetched("[last_message]")
        return res.send(chats)
    } catch (e) {
        return res.status(500)
    }
}

/**
 * Вывод сообщений чата
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetMessages = async (req, res) => {
    try {
        const {id} = req.params
        //
        await FacebookChatMessage.query().where({chat_id: id})
            .update({read_at: moment().format("YYYY-MM-DD HH:mm:ss")})
        //
        await sendSocketCount()
        //
        const messages = await FacebookChatMessage.query().where({chat_id: id})
        return res.send(messages)
    } catch (e) {
        return res.status(500)
    }
}

/**
 * Отправить сообщение
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const SendMessage = async (req, res) => {
    try {
        const {id} = req.params
        const {message} = req.body
        const chat = await FacebookChat.query().findById(id)
        facebookClient.sendText(String(chat.facebook_client_id), message)
        return res.send({status: "success"})
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {Webhook, GetAll, GetMessages, SendMessage}
