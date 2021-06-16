const {Tag} = require('models/settings/Tag')
const {Product} = require('models/products/Product')
const {logger} = require("config/logger.config")

/**
 * Вывод всех тегов
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const tags = await Tag.query().select('id', 'title')
        return res.send(tags)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактировать тег
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const {title} = req.body

        const tag = await Tag.query().updateAndFetchById(id, {title})
        return res.send(tag)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление тега
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const products = await Product.query().whereRaw(`JSON_CONTAINS(tags_id, '"${id}"')`)

        if (products.length)
            return res.status(500).send({message: 'Невозможно удалить! Данный тег используют!'})
        else
            await Tag.query().deleteById(id)

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Edit, Delete}