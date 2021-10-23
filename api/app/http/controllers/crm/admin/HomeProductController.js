const {ProductHomePosition} = require("models/products/ProductHomePosition")
const {ProductColor} = require("models/products/ProductColor")
const {logger} = require("config/logger.config")

/**
 * Вывод всех продуктов для дом. страницы
 * @returns
 */
const GetAll = async (req, res) => {
    try {
        const homeProducts = await ProductHomePosition.query().orderBy("position", "desc")
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
        await ProductHomePosition.query().insert({product_color_id, position})
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
        await ProductHomePosition.query().updateAndFetchById(id, {product_color_id, position})
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
        await ProductHomePosition.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetFree = async (req, res) => {
    try {
        const {position} = req.params
        const positions = await ProductHomePosition.query().pluck("position")
        const allPositions = Array.from({length: 24}, (_, i) => i + 1)
        const freePositions = allPositions.filter(
            _position => (position !== 0 && _position === Number(position)) || !positions.includes(_position)
        )

        return res.send(freePositions)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create, Delete, Edit, GetFree}
