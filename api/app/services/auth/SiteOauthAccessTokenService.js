const SiteOauthAccessToken = require("models/auth/SiteOauthAccessToken")
const jwt = require("jsonwebtoken")
const moment = require("moment") // require
const md5 = require("md5")
const {logger} = require("config/logger.config")

/**
 * Создание токена
 * @param clientId
 * @param remember
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (clientId, remember) => {
    try {
        const hash = md5(clientId + moment().toISOString())

        // Создание токена
        await SiteOauthAccessToken.query().insertAndFetch({
            id: hash,
            client_id: clientId,
            expires_at: remember
                ? moment().add(30, "days").format("YYYY-MM-DD HH:mm:ss")
                : moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss")
        })

        return await jwt.sign({jti: hash}, "fSuQSv8srByT0f09626oiY6cvdasdvxXQG3dy5Yu")
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Удаление токена
 * @param token
 * @return {Promise<void>}
 * @constructor
 */
const Delete = async token => {
    try {
        await SiteOauthAccessToken.query().findById(token).delete()
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {Create, Delete}
