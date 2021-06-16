const {AdditionalService} = require("models/settings/AdditionalService")
const {logger} = require("config/logger.config")

/**
 * Вывод всех доп. услуг
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const additionalServices = await AdditionalService.query().whereRaw(
            `JSON_SEARCH(display, 'all', 'pos') > 0`
        )
        return res.send(additionalServices)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
