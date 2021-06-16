const {Size} = require("models/settings/Size")
const {logger} = require("config/logger.config")

/**
 * Вывод всех размеров
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const sizes = await Size.query().select("id", "title")
        return res.send(sizes)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
