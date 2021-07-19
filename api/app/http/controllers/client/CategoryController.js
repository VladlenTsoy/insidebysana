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
        // TODO - Посмотреть
        // Продукты без кол-во
        const productsWithoutQty = await ProductColor.query()
            .where("hide_id", null)
            .join("sizes")
            .whereRaw(`JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) <= 0`)

        // Продукты без кол-во
        const productsQty = await ProductColor.query()
            .where("hide_id", null)
            .join("sizes")
            .whereRaw(`JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0`)

        // Ids продуктов без кол-во
        const _ids = productsWithoutQty.map(product => product.id)
        const _have_ids = productsQty.map(product => product.id)
        const ids = uniq(_ids).filter(id => !_have_ids.includes(id))

        //
        const productColors = await ProductColor.query()
            .where("product_colors.thumbnail", "IS NOT", null)
            .where("product_colors.hide_id", null)
            .where("hide_id", null)
            .whereNotIn("id", ids)

        //
        const products = await Product.query().whereIn(
            "id",
            productColors.map(productColor => productColor.product_id)
        )

        //
        const subCategories = await Category.query()
            .whereIn(
                "id",
                products.map(product => product.category_id)
            )
            .select("category_id")

        //
        const categories = await Category.query()
            .whereIn(
                "id",
                subCategories.map(subCategory => subCategory.category_id)
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
