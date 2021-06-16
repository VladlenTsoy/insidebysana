const {PaymentMethod} = require('models/payments/PaymentMethod');

/**
 * Вывод всех методов оплаты
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.query()
        return res.send(paymentMethods)
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}