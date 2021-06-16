const {ProductMeasurement} = require("models/products/ProductMeasurement");
const {Size} = require("models/settings/Size");
const {logger} = require("config/logger.config");

const GetByProductId = async (req, res) => {
    try {
        const {productId} = req.params
        const measurement = await ProductMeasurement.query()
            .where({product_id: productId})

        const _measurements = {
            product_id: productId,
            titles: [],
            sizes: []
        }

        if (measurement) {
            _measurements.titles = measurement.map((measurement) => measurement.title)
            const a = measurement.map((measurement) => measurement.descriptions)
            const b = a.reduce((state, value) => {
                Object.entries(value).map(val => {
                    if (typeof state[val[0]] === 'object')
                        state[val[0]].push(val[1])
                    else if (typeof state[val[0]] === 'undefined')
                        return state[val[0]] = [val[1]]
                })
                return state
            }, {})

            _measurements.sizes = await Promise.all(
                Object.entries(b).map(async ([key, val]) => {
                    const size = await Size.query().findById(key).select('id', 'title')
                    return {
                        name: size ? size.title : 'Н/Д',
                        descriptions: val
                    }
                })
            )
        }

        return res.send(_measurements)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByProductId}