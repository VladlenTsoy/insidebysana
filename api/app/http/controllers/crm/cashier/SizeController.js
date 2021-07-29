const {Size} = require("models/settings/Size")
const {logger} = require("config/logger.config")
const {raw} = require("objection")
const {ProductColor} = require("models/products/ProductColor")

/**
 * Вывод всех размеров
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const productSizesId = await ProductColor.query()
            .whereRaw(
                `exists(
                    SELECT id FROM sizes 
                    WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0
                )`
            )
            .select(raw("JSON_KEYS(`sizes`) as ids"))

        const ids = productSizesId.reduce((acc, row) => [...acc, ...row.ids], [])
        const sizes = await Size.query().whereIn("id", ids).select("id", "title")
        return res.send(sizes)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
