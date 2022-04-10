const request = require("request")
const FacebookChat = require("models/facebook-chat/FacebookChat")
const FacebookChatMessage = require("models/facebook-chat/FacebookChatMessage")

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
                    let webhookEvent = entry.messaging[0]
                    let senderPsid = webhookEvent.sender.id

                    let chat = await FacebookChat.query().findOne({facebook_client_id: senderPsid})
                    if (!chat)
                        chat = await FacebookChat.query().insert({
                            facebook_client_id: senderPsid
                        })

                    await FacebookChatMessage.query().insert({chat_id: chat.id, message: webhookEvent.message})
                    const messages = FacebookChatMessage.query().where({chat_id: chat.id}).count("id")

                    if (webhookEvent.message && !messages.length)
                        handleMessage(senderPsid, webhookEvent.message)
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

// Handles messages events
function handleMessage(senderPsid, receivedMessage) {
    callSendAPI(senderPsid, {
        "text": `Здравствуйте, менеджер скоро свяжется с вами!`
    })
}

function callSendAPI(senderPsid, response) {
    const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

    let requestBody = {
        "recipient": {
            "id": senderPsid
        },
        "message": response
    }

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": requestBody
    }, (err, _res, _body) => {
        if (!err) {
            console.log("Message sent!")
        } else {
            console.error("Unable to send message:" + err)
        }
    })
}

function handlePostback(senderPsid, receivedPostback) {
    let response
    let payload = receivedPostback.payload
    if (payload === "yes") {
        response = {"text": "Thanks!"}
    } else if (payload === "no") {
        response = {"text": "Oops, try sending another image."}
    }
    callSendAPI(senderPsid, response)
}

module.exports = {Webhook}
