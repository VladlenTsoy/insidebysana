const {ProductColor} = require("models/products/ProductColor")
const {logger} = require("config/logger.config")
const {Wishlist} = require("models/Wishlist")

/**
 * Вывод всего спика желаемого
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const {productColorIds} = req.body
        const products = await ProductColor.query()
            .withGraphFetched(`[discount, color]`)
            .join("products", "products.id", "product_colors.product_id")
            .whereIn("product_colors.id", productColorIds)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "product_colors.title",
                "products.category_id",
                "products.price"
            )

        return res.send({
            productColorIds,
            products
        })
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Сихронизация списка
 * @param {*} req
 * @param {*} res
 * @returns
 */
const SyncAndGetAll = async (req, res) => {
    try {
        const user = req.user
        const {productColorIds} = req.body

        let responseProductColorIds = []
        let responseProducts = []

        await Promise.all(
            productColorIds.map(async productColorId => {
                const checkWishlist = await Wishlist.query().findOne({
                    product_color_id: productColorId,
                    user_id: user.id
                })

                if (!checkWishlist)
                    await Wishlist.query().insert({
                        product_color_id: productColorId,
                        user_id: user.id
                    })
            })
        )

        const wishlistItems = await Wishlist.query().where({user_id: user.id})

        if (wishlistItems) {
            const wishlistProductColorIds = wishlistItems.map(
                wishlist => wishlist.product_color_id
            )
            responseProducts = await ProductColor.query()
                .withGraphFetched(
                    `[
                    discount(),
                    color(),                
                ]`
                )
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

            responseProductColorIds = responseProducts.map(
                product => product.id
            )
        }

        return res.send({
            products: responseProducts,
            productColorIds: responseProductColorIds
        })
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Add = async (req, res) => {
    try {
        const user = req.user
        const {productColorId} = req.body

        await Wishlist.query().insert({
            product_color_id: productColorId,
            user_id: user.id
        })

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Remove = async (req, res) => {
    try {
        const user = req.user
        const {productColorId} = req.body

        await Wishlist.query()
            .where({product_color_id: productColorId, user_id: user.id})
            .delete()

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, SyncAndGetAll, Add, Remove}
