const Bull = require("bull")
const {redis, defaultJobOptions, settings, limiter} = require("config/bull-queue.config")
const {logger} = require("config/logger.config")

// Очередь на добавление адреса к сделке
const AddAddressToOrder = new Bull("AddAddressToOrder", redis, defaultJobOptions, settings, limiter)

// Действие очереди
AddAddressToOrder.process(async ({data}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const {orderId, information} = data
        await OrderService.AddAddressToOrder(orderId, information)
    } catch (e) {
        logger.error(e.stack)
    }
})

// Очередь на добавление продуктов к сделке
const AddProductsToOrder = new Bull("AddProductsToOrder", redis, defaultJobOptions, settings, limiter)

// Действие очереди
AddProductsToOrder.process(async ({data}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const {orderId, products} = data
        await OrderService.AddProductsToOrder(orderId, products)
    } catch (e) {
        logger.error(e.stack)
    }
})

// Очередь на добавление доп.услуг к сделке
const AddAdditionalServiceToOrder = new Bull(
    "AddAdditionalServiceToOrder",
    redis,
    defaultJobOptions,
    settings,
    limiter
)

// Действие очереди
AddAdditionalServiceToOrder.process(async ({data}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const {orderId, additionalServices} = data
        await OrderService.AddAdditionalServicesToOrder(orderId, additionalServices)
    } catch (e) {
        logger.error(e.stack)
    }
})

// Очередь на добавление оплаты к сделке
const AddPaymentsToOrder = new Bull("AddPaymentsToOrder", redis, defaultJobOptions, settings, limiter)

// Действие очереди
AddPaymentsToOrder.process(async ({data}) => {
    try {
        const OrderService = require("services/order/OrderService")
        const {orderId, payments} = data
        await OrderService.AddPaymentsToOrder(orderId, payments)
    } catch (e) {
        logger.error(e.stack)
    }
})

// Очередь на изменения статуса или позиции у ордера
const UpdateStatusAndPositionToOrder = new Bull(
    "UpdateStatusAndPositionToOrder",
    redis,
    defaultJobOptions,
    settings,
    limiter
)

// Действие очереди
UpdateStatusAndPositionToOrder.process(async ({data}) => {
    try {
        const OrderService = require("services/order/OrderService")
        await OrderService.UpdateStatusAndPosition(data)
    } catch (e) {
        logger.error(e.stack)
    }
})

module.exports = {
    AddAddressToOrder,
    AddProductsToOrder,
    AddAdditionalServiceToOrder,
    UpdateStatusAndPositionToOrder,
    AddPaymentsToOrder
}
