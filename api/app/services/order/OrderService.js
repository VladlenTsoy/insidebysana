const {Order} = require("models/orders/Order")
const {OrderPayment} = require("models/orders/OrderPayment")
const {OrderProductColor} = require("models/orders/OrderProductColor")
const {OrderAdditionalService} = require("models/orders/OrderAdditionalService")
const {OrderAddress} = require("models/orders/OrderAddress")
const OrderEvents = require("../../events/OrderEvents")
const ProductColorService = require("services/product/ProductColorService")
const ClientService = require("services/client/ClientService")
const OrderQueue = require("jobs/OrderQueue")
const {logger} = require("config/logger.config")
const {raw} = require("objection")

/**
 * Вывод сделки
 * @returns
 */
const SelectOrderForAdminRef = () => {
    const ref = Order.query()
        .withGraphFetched(`[client, payments, user, additionalServices]`)
        .select(
            "id",
            "total_price",
            "promo_code",
            "status_id",
            "position",
            "created_at",
            "discount",
            "payment_state"
        )

    return ref
}

/**
 * Вывод сделки
 * @returns
 */
const SelectOrderRef = () => {
    const ref = Order.query()
        .withGraphFetched(`[client, payments, additionalServices]`)
        .select(
            "id",
            "total_price",
            "promo_code",
            "status_id",
            "position",
            "created_at",
            "discount",
            "payment_state"
        )

    return ref
}

/**
 * Создание сделки
 * @param {additionalServices, status_id, client, source_id, delivery_id, processing, payments, total_price, discount, address} data
 */
const Create = async (data, config) => {
    try {
        let {
            additionalServices,
            status_id = 1,
            client,
            source_id,
            delivery_id,
            payments,
            total_price,
            promo_code,
            discount,
            payment_state,
            products,
            user_id,
            processing,
            created_at,
            address
        } = data

        let client_id = null
        let position = null

        // Последняя сделка
        const lastOrder = await Order.query().orderBy("position", "desc").findOne({status_id})
        position = lastOrder ? lastOrder.position + 1 : 0

        // Поиск клиента
        if (client) {
            if (client.id) client_id = client.id
            else if (client.phone) {
                const selClient = await ClientService.FindOrCreateClientByPhone(client.phone, client)
                if (selClient) client_id = selClient.id
            }
        }

        // Создание сделки
        const order = await Order.query().insertAndFetch({
            client_id,
            status_id,
            source_id,
            delivery_id,
            total_price,
            promo_code,
            discount,
            user_id,
            payment_state,
            processing,
            position,
            created_at
        })

        if (order) {
            if (client)
                // Запуск действия
                OrderEvents.eventEmitter.emit("create_order_event", {
                    status_id,
                    client,
                    order_id: order.id
                })

            if (address)
                // Очередь на добавление адреса к сделке
                // OrderQueue.AddAddressToOrder.add({orderId: order.id, information: address})
                await AddAddressToOrder(order.id, address)

            if (products)
                // Очередь на добавление продуктов к сделке
                // OrderQueue.AddProductsToOrder.add({orderId: order.id, products})
                await AddProductsToOrder(order.id, products)

            if (additionalServices)
                //
                // OrderQueue.AddAdditionalServiceToOrder.add({orderId: order.id, additionalServices})
                await AddAdditionalServicesToOrder(order.id, additionalServices)

            if (payments)
                //
                // OrderQueue.AddPaymentsToOrder.add({orderId: order.id, payments})
                await AddPaymentsToOrder(order.id, payments)

            if (config && config.timer)
                // Добавить таймер для отмены сделки
                OrderQueue.AddTimerForCancelOrder(order.id)
        }

        return order
    } catch (e) {
        logger.error(e.stack)
    }
    return null
}

const EditById = async (id, data) => {
    try {
        let {
            additionalServices,
            client,
            delivery_id,
            payments,
            total_price,
            promo_code,
            discount,
            products,
            processing,
            created_at,
            address
        } = data

        let client_id = null

        // Поиск клиента
        if (client) {
            if (client.id) client_id = client.id
            else if (client.phone) {
                const selClient = await ClientService.FindOrCreateClientByPhone(client.phone, client)
                if (selClient) client_id = selClient.id
            }
        }

        //
        const order = await Order.query().updateAndFetchById(id, {
            client_id,
            delivery_id,
            total_price,
            promo_code,
            discount,
            processing,
            created_at
        })

        if (order) {
            if (address)
                // Очередь на добавление адреса к сделке
                // OrderQueue.AddAddressToOrder.add({orderId: id, information: address})
                await AddAddressToOrder(id, address)

            if (products)
                // Очередь на добавление продуктов к сделке
                // OrderQueue.AddProductsToOrder.add({orderId: id, products})
                await AddProductsToOrder(id, products)

            if (additionalServices)
                //
                // OrderQueue.AddAdditionalServiceToOrder.add({orderId: id, additionalServices})
                await AddAdditionalServicesToOrder(id, additionalServices)

            if (payments)
                //
                // OrderQueue.AddPaymentsToOrder.add({orderId: id, payments})
                await AddPaymentsToOrder(id, payments)
        }
        return order
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Добавить доп.услуги к сделке
 * @param {*} orderId
 * @param {*} additionalServices
 * @returns
 */
const AddAdditionalServicesToOrder = async (orderId, additionalServices) => {
    try {
        // TODO - удаление на редактирование
        await OrderAdditionalService.query().where({order_id: orderId}).delete()
        additionalServices.map(
            async additionalService =>
                await OrderAdditionalService.query().insert({
                    order_id: orderId,
                    title: additionalService.title,
                    price: additionalService.price,
                    qty: additionalService.qty
                })
        )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Добавить оплата к сделке
 * @param {*} orderId
 * @param {*} additionalServices
 * @returns
 */
const AddPaymentsToOrder = async (orderId, payments) => {
    try {
        // TODO - удаление на редактирование
        await OrderPayment.query().where({order_id: orderId}).delete()
        payments.map(
            async payment =>
                await OrderPayment.query().insert({
                    order_id: orderId,
                    payment_id: payment.payment_id,
                    price: payment.price
                })
        )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Добавить адрес к сделке
 * @param {*} orderId
 * @param {*} information
 * @returns
 */
const AddAddressToOrder = async (orderId, information) => {
    try {
        const checkPrevAddress = await OrderAddress.query().findOne({order_id: orderId})

        if (checkPrevAddress)
            await OrderAddress.query().findById(checkPrevAddress.id).update({
                full_name: information.full_name,
                phone: information.phone,
                country: information.country,
                city: information.city,
                address: information.address,
                position: information.position
            })
        else
            await OrderAddress.query().insert({
                order_id: orderId,
                full_name: information.full_name,
                phone: information.phone,
                country: information.country,
                city: information.city,
                address: information.address,
                position: information.position
            })
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Добавить товары к сделке
 * @param {*} orderId
 * @param {*} products
 * @returns
 */
const AddProductsToOrder = async (orderId, products) => {
    try {
        const checkPrevProductColors = await OrderProductColor.query().where({order_id: orderId})

        if (checkPrevProductColors) {
            await Promise.all(
                checkPrevProductColors.map(
                    async product =>
                        await ProductColorService.PlusQtyProductColor(
                            product.product_color_id,
                            product.size_id,
                            product.qty
                        )
                )
            )

            await OrderProductColor.query().where({order_id: orderId}).delete()
        }

        return Promise.all(
            products.map(async product => {
                const sizeId = product.size ? product.size.id : product.size_id

                // Создание ордера
                await OrderProductColor.query().insert({
                    product_color_id: product.id,
                    order_id: orderId,
                    size_id: sizeId,
                    qty: product.qty,
                    price: product.price,
                    discount: product.discount && product.discount.discount
                })
                // Изменения остатка
                await ProductColorService.MinusQtyProductColor(product.id, sizeId, product.qty)
            })
        )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Изменить статус и позищию сделки
 * @param {*} param0
 * @returns
 */
const UpdateStatusAndPosition = async ({order_id, status_id, prev_position, prev_status_id, position}) => {
    try {
        if (status_id) {
            await Order.query().updateAndFetchById(order_id, {status_id, position})
            await Order.query()
                .where("status_id", status_id)
                .where("position", ">=", position)
                .whereNot({id: order_id})
                .update({position: raw("position + 1")})
            await Order.query()
                .where("status_id", prev_status_id)
                .where("position", ">=", prev_position)
                .update({position: raw("position - 1")})
        } else {
            const order = await Order.query().updateAndFetchById(order_id, {position})
            if (position < prev_position) {
                await Order.query()
                    .where("status_id", order.status_id)
                    .where("position", ">=", position)
                    .where("position", "<=", prev_position)
                    .whereNot({id: order_id})
                    .update({position: raw("position + 1")})
            } else if (position > prev_position) {
                await Order.query()
                    .where("status_id", order.status_id)
                    .where("position", ">=", prev_position)
                    .where("position", "<=", position)
                    .whereNot({id: order_id})
                    .update({position: raw("position - 1")})
            }
        }

        const ref = SelectOrderRef()
        const order = await ref.findById(order_id)

        return order
    } catch (e) {
        logger.error(e.stack)
    }
}

const UpdateStatusAndPositionQueue = ({order_id, status_id, prev_position, prev_status_id, position}) => {
    try {
        OrderQueue.UpdateStatusAndPositionToOrder({
            order_id,
            status_id,
            prev_position,
            prev_status_id,
            position
        })
    } catch {
        logger.error(e.stack)
    }
}

/**
 * Таймер для отмены заказа
 * @param {*} orderId
 */
const AddTimerForCancelOrder = async orderId => {
    try {
        const order = await Order.query().findById(orderId)
        if (order.payment_state === 0)
            // Отмена сделки
            await Order.query().findById(orderId).update({payment_state: -1})
    } catch {
        logger.error(e.stack)
    }
}

module.exports = {
    Create,
    EditById,
    AddProductsToOrder,
    AddAddressToOrder,
    AddAdditionalServicesToOrder,
    SelectOrderRef,
    SelectOrderForAdminRef,
    UpdateStatusAndPosition,
    UpdateStatusAndPositionQueue,
    AddPaymentsToOrder,
    AddTimerForCancelOrder
}
