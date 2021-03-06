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
        let {search, categoryId, sizeId, currentPage, limit} = req.body

        // Поиск по SKU
        if (search && search.includes("PC")) {
            const [productColorId] = search.match(/\d+/g)
            search = productColorId
        }

        const refProductColor = ProductColor.query()
            .withGraphFetched(`[color, discount, sizes_props]`)
            .join("products", "products.id", "product_colors.product_id")
            .where("product_colors.hide_id", null)
            .select("product_colors.id", "product_colors.thumbnail", "products.title", "products.price")

        // Поиск
        if (search.trim() !== "") {
            refProductColor.where(builder => {
                builder
                    .whereRaw(
                        `product_colors.product_id IN (SELECT products.id FROM products WHERE products.title LIKE '%${search}%')`
                    )
                    .orWhereRaw(
                        `product_colors.color_id IN (SELECT colors.id FROM colors WHERE colors.title LIKE '%${search}%')`
                    )
                    .orWhere("product_colors.id", "LIKE", `%${search}%`)
            })
        }

        // Вывод по размерам
        if (sizeId && sizeId !== 0)
            refProductColor
                .whereRaw(
                    `JSON_SEARCH(JSON_KEYS(product_colors.sizes), 'all', ${String(sizeId)}) IS NOT null`
                )
                .whereRaw(`JSON_EXTRACT(product_colors.sizes, concat('$."',${sizeId},'".qty')) > 0`)
        // TODO - лучшее решение
        else
            refProductColor.whereRaw(
                `exists(SELECT id FROM sizes WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0)`
            )

        // По категориям
        if (categoryId && categoryId !== 0)
            refProductColor.whereRaw(
                `product_colors.product_id IN (SELECT id FROM products WHERE category_id = ${categoryId})`
            )

        const products = await refProductColor.page(currentPage, limit)
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
                .whereRaw(
                    `exists(SELECT id FROM sizes WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0)`
                )
                .withGraphFetched(`[color, discount, sizes_props]`)
                .join("products", "products.id", "product_colors.product_id")
                .where("product_colors.hide_id", null)
                .findById(productColorId)
                .select("product_colors.id", "product_colors.thumbnail", "products.title", "products.price")

            if (product)
                return res.send({
                    product_color_id: Number(productColorId),
                    size_id: Number(sizeId),
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
