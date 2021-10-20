const {Size} = require('models/settings/Size')
const {logger} = require('config/logger.config')
const {ProductColor} = require('models/products/ProductColor')
const {raw} = require('objection')

/**
 *
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
 * Редакьтровать цвет
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
                status: 'warning',
                message: 'Невозможно удалить! Данный размер используют!'
            })
        //
        else await Size.query().deleteById(id)

        return res.send({status: 'success'})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

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

const GetByFilter = async (req, res) => {
    try {
        const productSizesId = await ProductColor.query()
            .whereRaw(
                `exists(
                    SELECT id FROM sizes 
                    WHERE JSON_EXTRACT(product_colors.sizes_props, concat('$."',sizes.id,'".qty')) > 0
                )`
            )
            .select(raw('JSON_KEYS(`sizes_props`) as ids'))

        const ids = productSizesId.reduce(
            (acc, row) => [...acc, ...row.ids],
            []
        )
        const sizes = await Size.query()
            .whereIn('id', ids)
            .select('id', 'title')
        return res.send(sizes)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Hide, Display, Edit, Delete, GetByFilter}
