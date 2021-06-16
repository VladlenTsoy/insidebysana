const {Client} = require("models/Client")
const {logger} = require("config/logger.config")

/**
 * Вывод по поиску
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetBySearch = async (req, res) => {
    try {
        const {search} = req.body

        const clients = await Client.query()
            .select("id", "full_name", "email", "phone")
            .modify("search", search)

        return res.send(clients)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetBySearch}
