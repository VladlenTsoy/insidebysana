const {logger} = require("config/logger.config")
const {raw} = require("objection")
const OrderService = require("services/order/OrderService")
const {Order} = require("models/orders/Order")
const {Status} = require("models/orders/Status")
const moment = require("moment")
const {OrderPayment} = require("../../../models/orders/OrderPayment")

/**
 * Создать сделку
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {
            payment_id,
            delivery_id,
            products,
            discount,
            promo_code,
            total_price,
            information,
            additionalService
        } = req.body
        const user = req.user

        const status = await Status.query()
            .whereNotNull("conditions")
            .findOne(raw(`JSON_CONTAINS(conditions, '${payment_id}', '$.payments') > 0`))
            .findOne(raw(`JSON_CONTAINS(conditions, '0', '$.payments_state') > 0`))

        const payments = [{payment_id, price: total_price}]

        // Создание сделки
        const order = await OrderService.Create(
            {
                additionalServices: [{...additionalService, qty: 1}],
                payments,
                delivery_id,
                discount,
                promo_code,
                total_price,
                client: {
                    id: user ? user.id : null,
                    full_name: information.full_name,
                    phone: information.phone
                },
                address: information,
                status_id: status ? status.id : null,
                source_id: 3,
                products
            },
            {timer: true}
        )

        let paymentOpts = null

        if (order) {
            if (Number(payment_id) === 1)
                paymentOpts = {
                    method: "post",
                    url: "https://checkout.paycom.uz",
                    form: {
                        merchant: "605c878a73214c962bae8c16",
                        amount: Number(total_price) * 100,
                        "account[order_id]": order.id,
                        callback: `${process.env.APP_CLIENT_URL}/order/${order.id}`
                    }
                }
            else if (Number(payment_id) === 4)
                paymentOpts = {
                    method: "get",
                    url: "https://oplata.kapitalbank.uz/",
                    form: {
                        cash: "2a30ed5f4a3a4709be62ee4ad5d23502",
                        amount: Number(total_price) * 100,
                        description:
                            "фраза, который выйдет на экране оплаты у Пользователя, например «Пополнение платежа",
                        order_id: order.id,
                        redirectUrl: `${process.env.APP_CLIENT_URL}/order/${order.id}`
                    }
                }
        }

        return res.send({status: "success", order_id: order.id, payment_opts: paymentOpts})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Pay = async (req, res) => {
    try {
        const {payment_id, total_price, order_id} = req.body

        if (Number(payment_id) === 3) {
            await OrderPayment.query().where({order_id}).delete()
            await OrderPayment.query().insert({order_id, total_price, payment_id})
        } else if (Number(payment_id) === 1)
            paymentOpts = {
                method: "post",
                url: "https://checkout.paycom.uz",
                form: {
                    merchant: "605c878a73214c962bae8c16",
                    amount: Number(total_price) * 100,
                    "account[order_id]": order_id,
                    callback: `${process.env.APP_CLIENT_URL}/order/${order_id}`
                }
            }
        else if (Number(payment_id) === 4)
            paymentOpts = {
                method: "get",
                url: "https://oplata.kapitalbank.uz/",
                form: {
                    cash: "2a30ed5f4a3a4709be62ee4ad5d23502",
                    amount: Number(total_price) * 100,
                    description:
                        "фраза, который выйдет на экране оплаты у Пользователя, например «Пополнение платежа",
                    order_id: order_id,
                    redirectUrl: `${process.env.APP_CLIENT_URL}/order/${order_id}`
                }
            }

        return res.send({status: "success", order_id: order_id, payment_opts: paymentOpts})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetAll = async (req, res) => {
    try {
        const user = req.user
        //delivery
        //
        const orders = await Order.query()
            .where({client_id: user.id})
            // payment delete
            .withGraphFetched("[delivery, address, productColors, payments]")
            .orderBy("created_at", "desc")
            .select("created_at", "discount", "id", "payment_state", "total_price", "promo_code")

        return res.send(orders)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод по ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const order = await Order.query()
            .withGraphFetched("[productColors, address, payments, delivery, additionalServices]")
            .findById(id)
            .select("id", "created_at", "total_price", "payment_state", "promo_code")

        if (!order) return res.status(500).send({message: "Ошибка! Заказ не найден!"})

        const createdAt = moment(order.created_at)
        const currentTime = moment()

        const duration = moment.duration(currentTime.diff(createdAt))
        const hours = duration.asHours()

        if (hours > 2) {
            if (order.payment_state === 0) await Order.query().findById(id).update({payment_state: -1})
            return res.status(500).send({
                code: "er-order-1",
                message: "Срок действия вашей брони, к сожалению, истёк"
            })
        }
        console.log(hours)
        return res.send(order)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, GetAll, GetById, Pay}
