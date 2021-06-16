const {logger} = require("config/logger.config")
const OrderService = require("services/order/OrderService")
const {Order} = require("models/orders/Order")
const {Status} = require("models/orders/Status")
const {io} = require("config/socket.config")
const moment = require("moment")
const {raw} = require("objection")

/**
 * Создание заказа
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Create = async (req, res) => {
    try {
        const {payments, client, products, additionalServices, total_price, discount, processing} = req.body
        const user = req.user

        let status = await Status.query()
            .whereNotNull("conditions")
            .findOne(raw(`JSON_CONTAINS(conditions, '1', '$.payments_state') > 0`))
            .findOne(raw(`JSON_CONTAINS(conditions, '6', '$.source_ids') > 0`))
            .findOne(raw(`JSON_EXTRACT(conditions, '$.processing') = ${processing}`))

        const updatePayments = []

        if (payments) {
            if (payments.cash) updatePayments.push({payment_id: 3, price: payments.cash})
            if (payments.card) updatePayments.push({payment_id: 5, price: payments.card})
        }

        // Создание сделки
        const order = await OrderService.Create({
            payments: updatePayments,
            additionalServices,
            client,
            discount,
            processing,
            products,
            total_price,
            // TODO - Почему 6
            source_id: 6,
            user_id: user.id,
            status_id: status ? status.id : null,
            payment_state: 1
        })

        const orderRef = OrderService.SelectOrderRef().withGraphFetched("[productColors]")
        const resOrder = await orderRef.findById(order.id)

        return res.send(resOrder)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод заказов
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetAll = async (req, res) => {
    try {
        const {dateFrom, dateTo} = req.body
        const user = req.user

        let resOrders = Order.query()
            .withGraphFetched(`[client, payments, productColors, additionalServices]`)
            .select(
                "id",
                "total_price",
                "promo_code",
                "status_id",
                "position",
                "created_at",
                "discount",
                "payment_state",
                "processing"
            )
            .orderBy("created_at", "desc")
            .where({user_id: user.id})

        if (dateFrom && dateTo)
            resOrders.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        resOrders = await resOrders

        return res.send(resOrders)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create}
