const {Delivery} = require("models/settings/Delivery")
const {logger} = require("config/logger.config")

/**
 * Вывод доставки
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetByCountry = async (req, res) => {
    try {
        const {country} = req.body
        const deliveries = await Delivery.query().orderBy("created_at", "asc").where({country_id: country})

        return res.send(deliveries)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByCountry}
