const {PaymentMethod} = require("models/payments/PaymentMethod")
const {logger} = require("config/logger.config")

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
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}
