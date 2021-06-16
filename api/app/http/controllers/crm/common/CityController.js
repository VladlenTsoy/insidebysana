const {City} = require("models/settings/City")
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
        const cities = await City.query().select("id", "name", "country_id", "position")
        return res.send(cities)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
