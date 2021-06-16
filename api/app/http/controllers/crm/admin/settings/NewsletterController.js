const {Newsletter} = require("models/settings/Newsletter")
const {logger} = require("config/logger.config")

/**
 * Вывод всех подписанных на рассылку
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const newsletter = await Newsletter.query().select()
        return res.send(newsletter)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}