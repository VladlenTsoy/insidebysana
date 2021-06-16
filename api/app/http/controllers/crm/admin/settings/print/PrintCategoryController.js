const {PrintCategory} = require("models/print/PrintCategory")
const {logger} = require("config/logger.config")

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
        let category = await PrintCategory.query().select("id", "title").insertAndFetch(data)

        if (data.category_id)
            category = await PrintCategory.query()
                .withGraphFetched("[sub_categories()]")
                .select("id", "title", "hide_id")
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
        let category = await PrintCategory.query()
            .select("id", "title", "hide_id")
            .updateAndFetchById(id, data)

        if (data.category_id)
            category = await PrintCategory.query()
                .withGraphFetched("[sub_categories()]")
                .select("id", "title", "hide_id")
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
        // const pritnCategory = await PrintCategory.query().findById(id)

        const categories = await PrintCategory.query()
            .where({category_id: null})
            .withGraphFetched("[sub_categories()]")
            .select("id", "title", "url", "hide_id")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Edit, Delete}
