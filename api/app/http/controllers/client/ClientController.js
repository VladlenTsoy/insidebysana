const {logger} = require("config/logger.config")
const SiteOauthAccessTokenService = require("services/auth/SiteOauthAccessTokenService")
const {Client, ClientPassword} = require("models/Client")

const GetCurrent = async (req, res) => {
    try {
        const user = req.user
        return res.send(user)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Update = async (req, res) => {
    try {
        const {full_name, email, phone} = req.body
        const user = req.user

        const client = await Client.query().updateAndFetchById(user.id, {full_name, email, phone})

        return res.send(client)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const ChangePassword = async (req, res) => {
    try {
        const {password, currentPassword} = req.body
        const user = req.user

        const client = await ClientPassword.query().findById(user.id)

        if (!client) return res.status(500).send({status: "error", message: "Ошибка! Повторите попытку!"})

        const isMatch = await client.verifyPassword(currentPassword)

        if (!isMatch)
            return res.status(500).send({status: "error", message: "Ошибка! Текущий пароль введен неверно."})

        await ClientPassword.query().findById(user.id).update({password})

        return res.send({status: "success"})
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
        await SiteOauthAccessTokenService.Delete(user.token)
        req.logout()
        res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetCurrent, Logout, Update, ChangePassword}
