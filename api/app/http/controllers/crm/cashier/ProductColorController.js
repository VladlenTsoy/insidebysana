const {logger} = require("config/logger.config")
const {ProductColor} = require("models/products/ProductColor")
const {uniq} = require("lodash")
const {raw} = require("objection")

/**
 * Вывод по поиску
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetBySearch = async (req, res) => {
    try {
        let {search, categoryId, sizeId, currentPage} = req.body

        // Поиск по SKU
        if (search && search.includes("PC")) {
            const [productColorId] = search.match(/\d+/g)
            search = productColorId
        }

        const products = await ProductColor.query()
            .withGraphFetched(`[color, discount, sizes_props]`)
            .join("products", "products.id", "product_colors.product_id")
            .modify("filterSubCategory", categoryId)
            .modify("filterSizes", sizeId === 0 ? [] : [sizeId])
            .modify("search", search, false)
            .where("product_colors.hide_id", null)
            // TODO - лучшее решение
            .whereRaw(
                `exists(SELECT id FROM sizes WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0)`
            )
            .select("product_colors.id", "product_colors.thumbnail", "products.title", "products.price")
        .page(currentPage, 18)

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод продукта по SKU
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetBySKU = async (req, res) => {
    try {
        const {sku} = req.body
        const [productColorId, sizeId] = sku.match(/\d+/g)

        if (productColorId && sizeId) {
            const product = await ProductColor.query()
                .whereRaw(`JSON_EXTRACT(product_colors.sizes, concat('$."',${sizeId},'".qty')) > 0`)
                .findById(productColorId)
                .select("id", "thumbnail", "product_id", "sizes")
                .withGraphFetched(`[color,details,discount]`)

            if (product)
                return res.send({
                    product_color_id: productColorId,
                    size_id: sizeId,
                    qty: 1,
                    product: product
                })
        }

        return res.status(500).send({message: "Товар не найден!"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetBySearch, GetBySKU}
