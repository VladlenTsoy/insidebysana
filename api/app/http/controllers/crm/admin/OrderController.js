const {Order} = require("models/orders/Order")
const {OrderProductColor} = require("models/orders/OrderProductColor")
const {OrderAddress} = require("models/orders/OrderAddress")
const {Status} = require("models/orders/Status")
const {logger} = require("config/logger.config")
const OrderService = require("services/order/OrderService")
const {raw} = require("objection")
const moment = require("moment")

/**
 * Вывод всех сделок (Карточки)
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetByAll = async (req, res) => {
    try {
        const ordersRef = OrderService.SelectOrderForAdminRef()
        const orders = await ordersRef.whereNotNull("status_id")

        return res.send(orders)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const ordersRef = OrderService.SelectOrderForAdminRef()
        const order = await ordersRef.findById(id)

        return res.send(order)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Создание сделки
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const user = req.user
        const {
            client,
            address,
            products,
            total_price,
            delivery_id,
            discount,
            processing,
            created_at,
            payments,
            additionalServices
        } = req.body

        const payments_state = payments ? 1 : 0

        let status = await Status.query()
            .whereNotNull("conditions")
            .findOne(raw(`JSON_CONTAINS(conditions, '${payments_state}', '$.payments_state') > 0`))
            .findOne(raw(`JSON_CONTAINS(conditions, '3', '$.source_ids') > 0`))
            .findOne(raw(`JSON_EXTRACT(conditions, '$.processing') = ${processing}`))

        // Создание сделки
        const order = await OrderService.Create({
            client,
            payments,
            delivery_id,
            discount,
            total_price,
            // TODO - почему 1 ?
            status_id: status ? status.id : 1,
            // TODO - почему 3 ?
            source_id: 3,
            products,
            user_id: user.id,
            address,
            processing,
            created_at,
            additionalServices
        })

        const orderRef = OrderService.SelectOrderRef()
        const resOrder = await orderRef.findById(order.id)

        return res.send(resOrder)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const EditById = async (req, res) => {
    try {
        const {id} = req.params
        const {
            client,
            address,
            products,
            total_price,
            delivery_id,
            discount,
            processing,
            created_at,
            payments,
            additionalServices
        } = req.body

        // Создание сделки
        const order = await OrderService.EditById(id, {
            client,
            payments,
            delivery_id,
            discount,
            total_price,
            products,
            address,
            processing,
            created_at,
            additionalServices
        })

        const orderRef = OrderService.SelectOrderRef()
        const resOrder = await orderRef.findById(order.id)

        return res.send(resOrder)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Отмена сделки
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Cancel = async (req, res) => {
    try {
        const {id} = req.params
        let order = await Order.query().findById(id)

        // Если сделка не оплачена
        if (order.payment_id !== 1)
            // Отмена сделки
            order = await Order.query().updateAndFetchById(id, {payment_state: -1})

        return res.send({orderId: order.id, paymentState: order.payment_state})
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод адреса сделки
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetAddressByOrderId = async (req, res) => {
    try {
        const {id} = req.params

        const address = await OrderAddress.query().findOne({order_id: id})
        return res.send(address)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод продуктов сделки
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetProductsByOrderId = async (req, res) => {
    try {
        const {id} = req.params

        const productColors = await OrderProductColor.query()
            .withGraphFetched("[details, size]")
            .where({order_id: id})
            .select("qty", "price", "discount")
        return res.send(productColors)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Изменения статуса оплаты
 * @param {*} req
 * @param {*} res
 * @returns
 */
const ChangePaymentState = async (req, res) => {
    try {
        const {id} = req.params
        const {paymentState} = req.body

        await Order.query().findById(id).update({payment_state: paymentState})
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetForEditById = async (req, res) => {
    try {
        const {id} = req.params
        let order = await Order.query()
            .withGraphFetched(`[client, payments, additionalServices, address, delivery(edit)]`)
            .modifiers({
                edit(builder) {
                    builder.select("id", "title", "price")
                }
            })
            .select("created_at", "processing", "promo_code", "discount", "total_price", "id")
            .findById(id)

        order.products = await OrderProductColor.query()
            .where({order_id: id})
            .withGraphFetched(`[product.[details, discount]]`)

        return res.send(order)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод архива по дате
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetArchiveByDates = async (req, res) => {
    try {
        const {dateFrom, dateTo, sourceId} = req.body

        let resOrders = Order.query()
            .withGraphFetched(`[client, payments, productColors, additionalServices]`)
            .select(
                "id",
                "total_price",
                "promo_code",
                "created_at",
                "discount",
                "payment_state",
                "processing",
                "source_id"
            )
            .orderBy("created_at", "desc")

        if (dateFrom && dateTo)
            resOrders.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        if (sourceId && sourceId !== 0) resOrders.where("source_id", sourceId)

        resOrders = await resOrders

        return res.send(resOrders)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {
    GetById,
    GetByAll,
    GetArchiveByDates,
    EditById,
    Create,
    Cancel,
    GetAddressByOrderId,
    GetProductsByOrderId,
    ChangePaymentState,
    GetForEditById
}
