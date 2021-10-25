const {Size} = require("models/settings/Size")
const {logger} = require("config/logger.config")
const {ProductColor} = require("models/products/ProductColor")

/**
 * Создать цвет
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

/**
 * Редактировать цвет
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const {title} = req.body
        const size = await Size.query().updateAndFetchById(id, {title})
        return res.send(size)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const productColors = await ProductColor.query().whereRaw(
            `JSON_EXTRACT(sizes, '$."${id}".qty')`
        )

        if (productColors.length)
            return res.status(500).send({
                status: "warning",
                message: "Невозможно удалить! Данный размер используют!"
            })
        //
        else await Size.query().deleteById(id)

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Скрыть цвет
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Hide = async (req, res) => {
    try {
        const {id} = req.params
        const user = req.user
        const size = await Size.query().updateAndFetchById(id, {
            hide_id: user.id
        })
        return res.send(size)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Отобразить цвет
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Display = async (req, res) => {
    try {
        const {id} = req.params
        const size = await Size.query().updateAndFetchById(id, {hide_id: null})
        return res.send(size)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод размеров для фильтрация
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetByFilter = async (req, res) => {
    try {
        const sizes = await Size.query()
            .whereRaw(
                `id IN (SELECT product_sizes.size_id FROM product_sizes WHERE product_sizes.qty > 0)`
            )
            .select("id", "title")
        return res.send(sizes)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Hide, Display, Edit, Delete, GetByFilter}
