const {Size} = require("models/settings/Size")
const {logger} = require("config/logger.config")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title} = req.body
        const size = await Size.query().insertAndFetch({title})

        return res.send(size)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create}
