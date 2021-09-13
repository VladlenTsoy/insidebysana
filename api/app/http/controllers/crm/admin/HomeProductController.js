const {HomeProduct} = require("models/products/HomeProduct")
const {ProductColor} = require("models/products/ProductColor")
const {logger} = require("config/logger.config")

/**
 * Вывод всех продуктов для дом. страницы
 * @returns
 */
const GetAll = async (req, res) => {
    try {
        const homeProducts = await HomeProduct.query().orderBy("position", "desc")
        const ids = homeProducts.map(product => product.product_color_id)

        const products = await ProductColor.query()
            .join("products", "products.id", "product_colors.product_id")
            .join("colors", "colors.id", "product_colors.color_id")
            .join("home_products", "home_products.product_color_id", "product_colors.id")
            .whereRaw(`product_colors.id IN (SELECT home_products.product_color_id FROM home_products)`)
            .orderByRaw(`FIELD(product_colors.id, ${ids.reverse().join(",")})`)
            .select(
                "home_products.id",
                "home_products.product_color_id",
                "product_colors.thumbnail",
                "products.title",
                "products.price",
                "home_products.position",
                "colors.title as color_title"
            )
        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Добавить продукт для дом. страницы
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Create = async (req, res) => {
    try {
        const {product_color_id, position} = req.body
        await HomeProduct.query().insert({product_color_id, position})
        const product = await ProductColor.query()
            .join("products", "products.id", "product_colors.product_id")
            .join("colors", "colors.id", "product_colors.color_id")
            .join("home_products", "home_products.product_color_id", "product_colors.id")
            .findOne("product_colors.id", product_color_id)
            .select(
                "home_products.id",
                "home_products.product_color_id",
                "product_colors.thumbnail",
                "products.title",
                "products.price",
                "home_products.position",
                "colors.title as color_title"
            )
        return res.send(product)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Изменить продукт для дом. страницы
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const {product_color_id, position} = req.body
        await HomeProduct.query().updateAndFetchById(id, {product_color_id, position})
        const product = await ProductColor.query()
            .join("products", "products.id", "product_colors.product_id")
            .join("colors", "colors.id", "product_colors.color_id")
            .join("home_products", "home_products.product_color_id", "product_colors.id")
            .findOne("product_colors.id", product_color_id)
            .select(
                "home_products.id",
                "home_products.product_color_id",
                "product_colors.thumbnail",
                "products.title",
                "products.price",
                "home_products.position",
                "colors.title as color_title"
            )
        return res.send(product)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удалить продукт с дом. страницы
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        await HomeProduct.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetFree = async (req, res) => {
    try {
        const positions = await HomeProduct.query().pluck("position")
        const allPositions = Array.from({length: 24}, (_, i) => i + 1)
        const freePositions = allPositions.filter(position => !positions.includes(position))

        return res.send(freePositions)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create, Delete, Edit, GetFree}
