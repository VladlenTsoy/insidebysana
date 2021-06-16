const {ProductColor} = require("models/products/ProductColor")
const ImageService = require("services/image/ImageService")
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
            .select("product_colors.id", "product_colors.thumbnail", "product_colors.created_at", "sizes")
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Сохранение и обновление картинок
 * @param productId
 * @param colorId
 * @param images
 * @return {Promise<unknown[][]>}
 * @constructor
 */
const ImagesAndThumbnailSave = async (productId, colorId, images) => {
    try {
        let thumbnail = null
        const imagesPath = await Promise.all(
            images.map(async (image, key) => {
                if (image.includes("http")) return image.replace(`${process.env.APP_URL}/`, "")
                else {
                    const [imagePath, thumbnailPath] = await ImageService.ProductColorBase64ToImageUpload(
                        productId,
                        colorId,
                        image,
                        key
                    )
                    if (thumbnailPath) thumbnail = thumbnailPath
                    return imagePath
                }
            })
        )

        // Обновление картинки
        await ProductColor.query()
            .findById(colorId)
            .update(
                thumbnail
                    ? {
                          images: imagesPath,
                          thumbnail: thumbnail
                      }
                    : {
                          images: imagesPath
                      }
            )

        return [imagesPath, thumbnail]
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
        const productColor = await ProductColor.query().findById(productColorId)
        const sizes = productColor.sizes
        const totalQty = sizes[sizeId].qty - qty

        // Обновление
        sizes[sizeId].qty = totalQty

        // TODO - Уведомления
        if (sizes[sizeId].min_qty >= totalQty) console.log(1)

        // Сохранение
        await ProductColor.query().updateAndFetchById(productColorId, {sizes})
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
        const productColor = await ProductColor.query().findById(productColorId)
        const sizes = productColor.sizes
        const totalQty = sizes[sizeId].qty + qty

        // Обновление
        sizes[sizeId].qty = totalQty

        // Сохранение
        await ProductColor.query().updateAndFetchById(productColorId, {sizes})
        // Вывод остатка
        return totalQty
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {CreateOrUpdate, FindProductColorsByProductId, MinusQtyProductColor, PlusQtyProductColor}
