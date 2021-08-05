const {Category} = require("models/settings/Category")
const {ProductColor} = require("models/products/ProductColor")
const {Product} = require("models/products/Product")
const {logger} = require("config/logger.config")
const {uniq} = require("lodash")

/**
 * Вывод всех категорий
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        //
        const categories = await Category.query()
            .whereRaw(
                `id IN (
                    SELECT category_id FROM categories WHERE id IN (
                        SELECT category_id FROM products WHERE id IN (
                            SELECT product_id FROM product_colors WHERE thumbnail IS NOT NULL AND 
                            hide_id IS NULL AND
                            exists(SELECT id FROM sizes WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0)
                        )
                    )
                )`
            )
            .where({category_id: null, hide_id: null})
            .select("id", "title", "url")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
