const {Country} = require("models/settings/Country")
const {logger} = require("config/logger.config")

/**
 * Вывод всех
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const countries = await Country.query().select("id", "name", "flag", "position")
        return res.send(countries)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
