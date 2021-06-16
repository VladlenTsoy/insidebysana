const AdminChannels = require("./admin.channels")

module.exports = socket => {
    console.log("a user connected")
    const user = socket.user

    // Комната пользователя
    if (user.access === "admin") socket.join("admins")

    // Создать комнату пользователя
    socket.join(user.id)

    // Изменения статуса или позиции у ордера
    socket.on("order_update_status_and_position", data =>
        AdminChannels.UpdateStatusAndPositionOrder(socket, data)
    )

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
}
