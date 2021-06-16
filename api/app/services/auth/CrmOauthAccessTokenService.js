const CrmOauthAccessToken = require("models/auth/CrmOauthAccessToken")
const jwt = require("jsonwebtoken")
const moment = require("moment") // require
const md5 = require("md5")
const {logger} = require("config/logger.config")

/**
 * Создание токена
 * @param userId
 * @param remember
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (userId, remember) => {
    try {
        const hash = md5(userId + moment().toISOString())

        // Создание токена
        await CrmOauthAccessToken.query().insertAndFetch({
            id: hash,
            user_id: userId,
            expires_at: remember
                ? moment().add(30, "days").format("YYYY-MM-DD HH:mm:ss")
                : moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss")
        })

        return await jwt.sign({jti: hash}, "fSuQSv8srByT0f09626oiY6cvzuf7vxXQG3dy5Yu")
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
        await CrmOauthAccessToken.query().findById(token).delete()
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {Create, Delete}
