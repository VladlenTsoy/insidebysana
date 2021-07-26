const socket = require("socket.io")

const io = socket({
    cors: {
        origin: true,
        credentials: true
    }
})

const socketConfig = (request, response, next) => {
    request.io = io
    next()
}

module.exports = {socketConfig, io}
