const {ProductColor} = require("models/products/ProductColor")
const {logger} = require("config/logger.config")
const {Size} = require("models/settings/Size")
const {Cart} = require("models/Cart")
const {raw} = require("objection")

/**
 * Вывод всей корзины
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const {skus} = req.body
        const responseProducts = []
        const responseSkus = []

        await Promise.all(
            skus.map(async sku => {
                if (typeof sku !== "string") return
                const [productColorId, sizeId] = sku.match(/\d+/g)
                if (productColorId && sizeId) {
                    let product = await ProductColor.query()
                        .withGraphFetched(
                            `[
                        discount(),
                        color(),                
                    ]`
                        )
                        .join("products", "products.id", "product_colors.product_id")
                        .findOne({"product_colors.id": productColorId})
                        .select(
                            "product_colors.id",
                            "product_colors.thumbnail",
                            "product_colors.title",
                            "products.category_id",
                            "products.price"
                        )
                    if (product) {
                        product.sku = sku
                        responseSkus.push(sku)
                        product.qty = 1
                        const size = await Size.query()
                            .join(
                                `product_colors`,
                                raw(
                                    `product_colors.id IN (SELECT product_sizes.product_color_id FROM product_sizes WHERE product_sizes.qty > 0)`
                                )
                            )
                            .findById(sizeId)
                            .select(
                                "sizes.id",
                                "sizes.title",
                                raw(
                                    `product_colors.id IN (SELECT product_sizes.product_color_id FROM product_sizes WHERE product_sizes.qty > 0)`
                                )
                            )
                        if (size) {
                            product.size = size
                            responseProducts.push(product)
                        }
                    }
                }
            })
        )

        return res.send({
            skus: responseSkus,
            products: responseProducts
        })
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Add = async (req, res) => {
    try {
        const user = req.user
        const {sku} = req.body

        await Cart.query().insert({sku, user_id: user.id})

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Remove = async (req, res) => {
    try {
        const user = req.user
        const {sku} = req.body

        await Cart.query().where({sku, user_id: user.id}).delete()

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const UpdateQty = async (req, res) => {
    try {
        const user = req.user
        const {sku, qty} = req.body

        await Cart.query().where({sku, user_id: user.id}).update({qty})

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const SyncAndGetAll = async (req, res) => {
    try {
        const user = req.user
        const {skus} = req.body

        const responseProducts = []
        const responseSkus = []

        await Promise.all(
            skus.map(async sku => {
                const checkCart = await Cart.query().findOne({sku, user_id: user.id})

                if (!checkCart) await Cart.query().insert({sku, user_id: user.id})
            })
        )

        const cartItems = await Cart.query().where({user_id: user.id})

        if (cartItems)
            await Promise.all(
                cartItems.map(async ({sku, qty}) => {
                    const [productColorId, sizeId] = sku.match(/\d+/g)

                    if (productColorId && sizeId) {
                        let product = await ProductColor.query()
                            .withGraphFetched(
                                `[
                        discount(),
                        color(),                
                    ]`
                            )
                            .join("products", "products.id", "product_colors.product_id")
                            .findOne({"product_colors.hide_id": null, "product_colors.id": productColorId})
                            .select(
                                "product_colors.id",
                                "product_colors.thumbnail",
                                "products.title",
                                "products.category_id",
                                "products.price"
                            )
                        if (product) {
                            product.sku = sku
                            responseSkus.push(sku)
                            product.qty = qty
                            const size = await Size.query()
                                .join(
                                    `product_colors`,
                                    raw(
                                        `JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0`
                                    )
                                )
                                .findById(sizeId)
                                .select(
                                    "sizes.id",
                                    "sizes.title",
                                    raw(
                                        `JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) as qty`
                                    )
                                )
                            if (size) {
                                product.size = size
                                responseProducts.push(product)
                            }
                        }
                    }
                })
            )

        return res.send({
            skus: responseSkus,
            products: responseProducts
        })
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Clear
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const Clear = async (req, res) => {
    try {
        const user = req.user
        await Cart.query().where({user_id: user.id}).delete()

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Add, Remove, UpdateQty, SyncAndGetAll, Clear}
