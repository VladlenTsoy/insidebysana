const {ProductColor} = require("models/products/ProductColor")
const {ProductSize} = require("models/products/ProductSize")
const {logger} = require("config/logger.config")

/**
 * Найти цвета по продукту
 * @param productId
 * @return {Promise<*>}
 * @constructor
 */
const FindProductColorsByProductId = async productId => {
    try {
        return await ProductColor.query()
            .withGraphFetched(
                `[
                details(),
                tags(),
                color(),
                discount(),
                category(),
            ]`
            )
            .where("product_id", productId)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "product_colors.created_at",
                "sizes"
            )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Создание или изменения
 * @param colors
 * @param productId
 * @return {Promise<unknown[]>}
 * @constructor
 */
const CreateOrUpdate = async (colors, productId) => {
    try {
        return await Promise.all(
            colors.map(async color => {
                if (color.id) {
                    await ProductColor.query().findById(color.id).update({
                        sizes: color.props,
                        product_id: productId,
                        color_id: color.color_id
                    })
                } else {
                    await ProductColor.query().insert({
                        sizes: color.props,
                        product_id: productId,
                        color_id: color.color_id
                    })
                }
            })
        )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Минусовать товар
 * @param productColorId
 * @param sizeId
 * @param qty
 * @return {Promise<number>}
 * @constructor
 */
const MinusQtyProductColor = async (productColorId, sizeId, qty) => {
    try {
        const productSize = await ProductSize.query().findOne({
            product_color_id: productColorId,
            size_id: sizeId
        })
        const totalQty = productSize.qty - qty
        // TODO - Уведомления
        if (productSize.min_qty >= totalQty) {
            const isActive = await ProductSize.query().where({product_color_id: productColorId})
                .where("qty", ">", 0)
            //
            if (!isActive) {
                await ProductColor.query().findById(productColorId)
                    .where("status", "=", "published")
                    .update({status: "ending"})
            }
        }
        await ProductSize.query()
            .findById(productSize.id)
            .patch({qty: totalQty})
        // Вывод остатка
        return totalQty
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Плюсовать товар
 * @param productColorId
 * @param sizeId
 * @param qty
 * @return {Promise<number>}
 * @constructor
 */
const PlusQtyProductColor = async (productColorId, sizeId, qty) => {
    try {
        const productSize = await ProductSize.query().findOne({
            product_color_id: productColorId,
            size_id: sizeId
        })
        const totalQty = productSize.qty + qty
        await ProductSize.query()
            .findById(productSize.id)
            .patch({qty: totalQty})
        // Вывод остатка
        return totalQty
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {
    CreateOrUpdate,
    FindProductColorsByProductId,
    MinusQtyProductColor,
    PlusQtyProductColor
}
