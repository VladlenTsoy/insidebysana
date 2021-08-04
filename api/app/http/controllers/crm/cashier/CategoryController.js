const {logger} = require("config/logger.config")
const {Category} = require("models/settings/Category")

// Вывод всех категорий
const GetAll = async (req, res) => {
    try {
        const categories = await Category.query()
            .where({category_id: null})
            .modify("onlyActiveCategories")
            .withGraphFetched("[sub_categories(onlyActiveSubCategories)]")
            .select("id", "title")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
