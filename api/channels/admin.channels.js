const {logger} = require("../config/logger.config")
const {FacebookChatMessage} = require("../app/models/facebook-chat/FacebookChatMessage")
const moment = require("moment")

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

const CheckCountNewMessages = async (socket) => {
    try {
        const count = await FacebookChatMessage.query().where({read_at: null, user_id: null})
        socket.emit("count_new_messages", count.length)
    } catch (e) {
        logger.error(e.stack)
    }
}

const ReadNewMessage = async (socket, data) => {
    try {
        await FacebookChatMessage.query().findById(data.id).update({read_at: moment().format("YYYY-MM-DD HH:mm:ss")})
        await CheckCountNewMessages(socket)
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {UpdateStatusAndPositionOrder, CheckCountNewMessages, ReadNewMessage}
