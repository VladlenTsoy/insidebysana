const {Category} = require("models/settings/Category")
const {Product} = require("models/products/Product")
const {logger} = require("config/logger.config")

/**
 * Вывод активных
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetByActive = async (req, res) => {
    try {
        const subCategories = await Category.query()
            .whereNull("hide_id")
            .whereNotNull("category_id")
            .select("category_id")
            .distinct("category_id")
            .pluck("category_id")

        const categories = await Category.query()
            .whereNull("hide_id")
            .withGraphFetched("[sub_categories()]")
            .whereIn("id", subCategories)
            .select("id", "title")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Создать категорию
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const data = req.body
        let category = await Category.query().select("id", "title").insertAndFetch(data)

        if (data.category_id)
            category = await Category.query()
                .withGraphFetched("[sub_categories()]")
                .select("id", "title", "url", "hide_id")
                .findById(data.category_id)

        return res.send(category)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактировать категорию
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params

        const data = req.body
        let category = await Category.query()
            .select("id", "title", "url", "hide_id")
            .updateAndFetchById(id, data)

        if (data.category_id)
            category = await Category.query()
                .withGraphFetched("[sub_categories()]")
                .select("id", "title", "url", "hide_id")
                .findById(data.category_id)

        return res.send(category)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление категории
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const category = await Category.query().findById(id)

        if (category.category_id) {
            const products = await Product.query().where("category_id", id)
            if (products.length)
                return res.status(500).send({message: "Невозможно удалить! У данной категории есть товары!"})
        } else {
            const products = await Product.query().whereRaw(
                `category_id IN (SELECT id FROM categories WHERE category_id = ${category.id})`
            )
            if (products.length)
                return res.status(500).send({message: "Невозможно удалить! У данной категории есть товары!"})
        }

        await Category.query().deleteById(id)

        const categories = await Category.query()
            .where({category_id: null})
            .withGraphFetched("[sub_categories()]")
            .select("id", "title", "url", "hide_id")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Edit, Delete, GetByActive}
