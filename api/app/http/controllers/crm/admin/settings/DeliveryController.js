const {Delivery} = require("models/settings/Delivery")
const {logger} = require("config/logger.config")

const GetForSelectByCountry = async (req, res) => {
    try {
        const {country} = req.params
        const deliveries = await Delivery.query().where({country}).select("id", "title", "price")

        return res.send(deliveries)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetForSelectByCountry}
