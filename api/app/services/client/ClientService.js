const {Client} = require("models/Client")
const {logger} = require("config/logger.config")

/**
 * Поиск клиента по телефону и добавление его
 * @param {*} phone
 * @param {*} full_name
 * @returns
 */
const FindOrCreateClientByPhone = async (phone, data) => {
    try {
        let client = await Client.query().findOne({phone})
        if (!client)
            // Создание клиента
            client = await Client.query().insertAndFetch(data)
        return client
    } catch (e) {
        logger.error(e.stack)
    }
    return null
}

module.exports = {FindOrCreateClientByPhone}
