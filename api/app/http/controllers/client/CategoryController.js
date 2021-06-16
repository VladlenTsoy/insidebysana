const {Category} = require("models/settings/Category")
const {logger} = require("config/logger.config")

/**
 * Вывод всех категорий
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const categories = await Category.query()
            .where({category_id: null, hide_id: null})
            .select("id", "title", "url")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
