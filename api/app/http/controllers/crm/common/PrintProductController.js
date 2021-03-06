const {PrintProduct} = require("models/print/PrintProduct")
const {PrintImage} = require("models/print/PrintImage")
const {logger} = require("config/logger.config")
const {ProductColor} = require("models/products/ProductColor")
const {raw} = require("objection")
const {Color} = require("models/settings/Color")

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetByPrintImageId = async (req, res) => {
    try {
        const {print_image_id} = req.params
        const printProducts = await PrintProduct.query()
            .join("product_colors", "product_colors.id", "print_products.product_color_id")
            .join("products", "products.id", "product_colors.product_id")
            .join("print_images", "print_images.id", "print_products.print_image_id")
            .where({print_image_id: print_image_id})
            .select(
                "print_products.id",
                "print_products.title",
                "print_products.product_color_id",
                "print_products.print_image_id",
                "print_products.thumbnail"
                // "print_products.image"
            )
            .select(raw("print_images.price + products.price").as("price"))

        return res.send(printProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetLatest = async (req, res) => {
    try {
        const printProducts = await PrintProduct.query()
            .join("product_colors", "product_colors.id", "print_products.product_color_id")
            .join("products", "products.id", "product_colors.product_id")
            .join("print_images", "print_images.id", "print_products.print_image_id")
            .select(
                "print_products.id",
                "print_products.title",
                // "print_products.product_color_id",
                // "print_products.print_image_id",
                "print_products.thumbnail"
                // "print_products.image"
            )
            .orderBy("print_products.created_at", "asc")
            .select(raw("print_images.price + products.price").as("price"))

        return res.send(printProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const printProduct = await PrintProduct.query()
            .findById(id)
            .select("id", "title", "product_color_id", "print_image_id", "image")
        if (!printProduct) return res.status(500).send({message: "Неизвестная ошибка!"})

        const printImage = await PrintImage.query()
            .findById(printProduct.print_image_id)
            .select("id", "price")
        if (!printProduct) return res.status(500).send({message: "Неизвестная ошибка!"})

        const productColor = await ProductColor.query()
            .findById(printProduct.product_color_id)
            .withGraphFetched(`[sizes_props,discount]`)
            .join("products", "products.id", "product_colors.product_id")
            .select(
                "product_colors.id",
                "product_colors.product_id",
                "products.properties",
                "products.title",
                "products.price"
            )
        if (!productColor) return res.status(500).send({message: "Неизвестная ошибка!"})

        // printProduct.colors = await Color.query().where()

        const printProducts = await PrintProduct.query()
            .joinRaw("JOIN product_colors productColor ON productColor.id = print_products.product_color_id")
            .join("colors", "colors.id", "productColor.color_id")
            .whereRaw(
                `print_products.product_color_id IN (SELECT id FROM product_colors WHERE product_colors.product_id = ${productColor.product_id})`
            )
            .where({print_image_id: printProduct.print_image_id})
            .select("colors.id", "colors.title", "colors.hex", "print_products.id as product_id")

        printProduct.colors = printProducts
        printProduct.discount = productColor.discount
        printProduct.sizes_props = productColor.sizes_props
        printProduct.price = productColor.price + printImage.price

        return res.send(printProduct)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByPrintImageId, GetLatest, GetById}
