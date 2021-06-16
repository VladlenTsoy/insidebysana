const socket = require("socket.io")

const io = socket({
    cors: {
        origin: [process.env.APP_CLIENT_URL, process.env.APP_CRM_URL],
        credentials: true
    }
})

const socketConfig = (request, response, next) => {
    request.io = io
    next()
}

module.exports = {socketConfig, io}
