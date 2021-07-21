const {Client} = require("models/Client")
const {Cart} = require("models/Cart")
const {ProductColor} = require("models/products/ProductColor")
const {Wishlist} = require("models/Wishlist")
const {logger} = require("config/logger.config")
const moment = require("moment")
const {Size} = require("models/settings/Size")
const {Order} = require("models/orders/Order")
const {raw} = require("objection")

/**
 * Вывод клиентов
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAllPaginate = async (req, res) => {
    try {
        const {search, pagination, sorter} = req.body
        const order = sorter.order === "ascend" ? "asc" : "desc"

        const clients = await Client.query()
            .withGraphFetched(
                `[
                source(),
            ]`
            )
            .modify("search", search)
            .orderBy(sorter.field, order)
            .page(pagination.page, pagination.pageSize)

        return res.send(clients)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод клиента
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const client = await Client.query().withGraphFetched(`source`).findById(id)

        return res.send(client)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод по поиску
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetBySearch = async (req, res) => {
    try {
        const {search} = req.body

        const clients = await Client.query()
            .select("id", "full_name", "email", "phone")
            .modify("search", search)

        return res.send(clients)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Создание клиента
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const body = req.body

        const client = await Client.query()
            .withGraphFetched(
                `[
                source(),
            ]`
            )
            .insert(body)

        return res.send(client)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактирование клиента
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const body = req.body

        if (body.date_of_birth) body.date_of_birth = moment(body.date_of_birth).format("YYYY-MM-DD")

        const client = await Client.query()
            .withGraphFetched(
                `[
                source(),
            ]`
            )
            .updateAndFetchById(id, body)

        return res.send(client)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetProductsByCart = async (req, res) => {
    try {
        const {id} = req.params
        const cart = await Cart.query().where({user_id: id})
        const responseProducts = []

        await Promise.all(
            cart.map(async val => {
                const [productColorId, sizeId] = val.sku.match(/\d+/g)

                if (productColorId && sizeId) {
                    let product = await ProductColor.query()
                        .withGraphFetched(`[discount, color]`)
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
                        product.sku = val.sku
                        product.qty = val.qty
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

        return res.send(responseProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetProductsByWishlist = async (req, res) => {
    try {
        const {id} = req.params
        const wishlist = await Wishlist.query().where({user_id: id})
        let responseProducts = []

        if (wishlist) {
            const wishlistProductColorIds = wishlist.map(item => item.product_color_id)
            responseProducts = await ProductColor.query()
                .withGraphFetched(`[discount, color]`)
                .join("products", "products.id", "product_colors.product_id")
                .where("product_colors.hide_id", null)
                .whereIn("product_colors.id", wishlistProductColorIds)
                .select(
                    "product_colors.id",
                    "product_colors.thumbnail",
                    "products.title",
                    "products.category_id",
                    "products.price"
                )
        }

        return res.send(responseProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetOrdersByClientId = async (req, res) => {
    try {
        const {id} = req.params

        const orders = await Order.query()
            .withGraphFetched(`[payments, user, status]`)
            .where({client_id: id})
            .orderBy("created_at", "desc")
            .select("id", "total_price", "created_at", "payment_state")

        return res.send(orders)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {
    GetAllPaginate,
    Create,
    GetBySearch,
    Edit,
    GetProductsByCart,
    GetProductsByWishlist,
    GetOrdersByClientId,
    GetById
}
