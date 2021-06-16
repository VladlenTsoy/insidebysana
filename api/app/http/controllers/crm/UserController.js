const {logger} = require("config/logger.config")
const CrmOauthAccessTokenService = require("services/auth/CrmOauthAccessTokenService")

/**
 * Вывод текущего пользователя
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetCurrent = async (req, res) => {
    try {
        const user = req.user
        return res.send(user)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Выход
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Logout = async (req, res) => {
    try {
        const user = req.user
        await CrmOauthAccessTokenService.Delete(user.token)
        req.logout()
        res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {
    GetCurrent,
    Logout
}
