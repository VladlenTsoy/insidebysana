const {ProductMeasurement} = require('models/products/ProductMeasurement')

/**
 * Сохранение или обновление обьемов
 * @param measurements
 * @param productId
 * @return {Promise<void>}
 * @constructor
 */
const CreateOrUpdate = async (measurements, productId) => {
    await Promise.all(
        Object.values(measurements).map(async measurement =>
            measurement.id ?
                await ProductMeasurement.query().updateAndFetchById(measurement.id, {
                    title: measurement.title,
                    descriptions: measurement.descriptions,
                    product_id: productId
                }) :
                await ProductMeasurement.query().insertAndFetch({
                    title: measurement.title,
                    descriptions: measurement.descriptions,
                    product_id: productId
                })
        )
    )
}

module.exports = {CreateOrUpdate}