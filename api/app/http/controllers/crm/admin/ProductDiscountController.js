const {ProductDiscount} = require('models/products/ProductDiscount')
const {ProductColor} = require('models/products/ProductColor')
const moment = require('moment')

const Update = async (req, res) => {
    try {
        const {productColorId} = req.params
        const data = req.body

        const discount = await ProductDiscount.query().findOne('product_color_id', '=', productColorId)
        data.end_at = data.end_at ? moment(data.end_at).format('YYYY-MM-DD HH:mm:ss') : null

        if (discount)
            await ProductDiscount.query().where('product_color_id', '=', productColorId)
                .update({discount: data.discount, end_at: data.end_at})
        else
            await ProductDiscount.query().insert({
                product_color_id: productColorId,
                discount: data.discount,
                end_at: data.end_at
            })

        const productColor = await ProductColor.query()
            .withGraphFetched(`[
                details(),
                tags(),
                discount(),
                category(),
            ]`).findById(productColorId)
        return res.send(productColor)
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Update}