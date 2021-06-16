const {Banner} = require('models/settings/Banner')
const {logger} = require("config/logger.config");

/**
 * Вывод баннеров
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const banners = await Banner.query()
            .select('id', 'title', 'image', 'button_link', 'button_title')

        return res.send(banners)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}