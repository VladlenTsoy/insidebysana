const {PrintImage} = require("models/print/PrintImage")
const {logger} = require("config/logger.config")

/**
 * Вывод всех категорий
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const printImages = await PrintImage.query()
            .where({hide_id: null})
            .withGraphFetched("[category]")
            .select("id", "title", "hide_id", "image", "price")
        return res.send(printImages)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
