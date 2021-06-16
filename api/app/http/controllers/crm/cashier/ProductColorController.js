const {logger} = require("config/logger.config")
const {ProductColor} = require("models/products/ProductColor")

/**
 * Вывод по поиску
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetBySearch = async (req, res) => {
    try {
        let {search, categoryId, sizeId} = req.body

        // Поиск по SKU
        if (search.includes("PC")) {
            const [productColorId] = search.match(/\d+/g)
            search = productColorId
        }

        // Продукты без кол-во
        const productsWithoutQty = await ProductColor.query()
            .join("sizes")
            .whereRaw(`JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) <= 0`)

        // Ids продуктов без кол-во
        const ids = productsWithoutQty.map(product => product.id)

        // Продукты
        const products = await ProductColor.query()
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "product_colors.product_id",
                "product_colors.sizes"
            )
            .whereNotIn("id", ids)
            .withGraphFetched(`[color, details, discount]`)
            .modify("filterSubCategory", categoryId)
            .modify("filterSizes", sizeId === 0 ? [] : [sizeId])
            .modify("search", search)
            .where("hide_id", null)
            .whereNotIn("id", ids)

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
