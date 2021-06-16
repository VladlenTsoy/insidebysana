const {raw} = require("objection")
const {logger} = require("../config/logger.config")

const UpdateStatusAndPositionOrder = async (socket, data) => {
    try {
        const {order_id, status_id, prev_position, prev_status_id, position} = data
        const OrderService = require("services/order/OrderService")
        const order = await OrderService.UpdateStatusAndPosition({
            order_id,
            status_id,
            prev_position,
            prev_status_id,
            position
        })
        if (order) socket.broadcast.emit("order_update", order)
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {UpdateStatusAndPositionOrder}
