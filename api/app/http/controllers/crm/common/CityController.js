const {City} = require("models/settings/City")
const {logger} = require("config/logger.config")

/**
 * Вывод всех
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetByCountryId = async (req, res) => {
    try {
        const {countryId} = req.params
        const cities = await City.query()
            .where({country_id: countryId})
            .select("id", "name", "position", "country_id")
        return res.send(cities)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByCountryId}
