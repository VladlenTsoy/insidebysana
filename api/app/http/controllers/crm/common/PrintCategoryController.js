const {PrintCategory} = require("models/print/PrintCategory")
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
        const printCategories = await PrintCategory.query()
            .where({category_id: null})
            .withGraphFetched("[sub_categories()]")
            .select("id", "title", "hide_id", "image")
        return res.send(printCategories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
