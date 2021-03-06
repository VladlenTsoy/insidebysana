const events = require("events")
const eventEmitter = new events.EventEmitter()
const {SendMessageQueue} = require("jobs/SendMessageQueue")
const {Status} = require("models/orders/Status")
const {logger} = require("config/logger.config")
const {io} = require("config/socket.config")
const SMSTemplateService = require("services/SMSTemplateService")

/**
 * События при создание сделки
 * @param {*} param0
 */
const CreateHandler = async ({status_id, lead, order_id}) => {
    if (!order_id) return

    try {
        const OrderService = require("services/order/OrderService")
        const ref = OrderService.SelectOrderForAdminRef()
        const order = await ref.findById(order_id)

        if (!order) return

        // Уведомление для администраторов
        io.to("admins").emit("order_create", order)

        if (status_id && lead) {
            // Вывод статуса
            const status = await Status.query().findById(status_id)
            if (status && Array.isArray(status.sms) && status.sms.length) {
                const smsAction = status.sms.find(sms => sms.payment_state.includes(order.payment_state))

                if (smsAction) {
                    const updateMessage = SMSTemplateService.ReplaceVariablesToData(
                        smsAction.message,
                        order_id,
                        order.total_price
                    )

                    if (updateMessage)
                        // Отпрака сообщения
                        SendMessageQueue({
                            phone: information.phone,
                            message: updateMessage,
                            timeout: smsAction.timeout
                        })
                }
            }
        }
    } catch (e) {
        logger.error(e.stack)
    }
}

eventEmitter.on("create_order_event", CreateHandler)

/**
 * События при изменении статуса оплаты
 * @param {*} param0
 */
const ChangePaymentStateHandler = async ({orderId, paymentState}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const ref = OrderService.SelectOrderRef()
        const order = await ref.updateAndFetchById(orderId, {payment_state: paymentState})

        //
        io.broadcast.emit("update_order", order)
    } catch (e) {
        logger.error(e.stack)
    }
}

eventEmitter.on("change_payment_state_order_event", ChangePaymentStateHandler)

/**
 *
 * @param {*} param0
 */
const UpdateStatusHandler = async ({orderId}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const ref = OrderService.SelectOrderRef()
        const order = await ref.findById(orderId)

        //
        io.emit("event_update_order", order)
    } catch (e) {
        logger.error(e.stack)
    }
}

eventEmitter.on("update_status_order_event", UpdateStatusHandler)

module.exports = {eventEmitter}
