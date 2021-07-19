const socket = require("socket.io")

const io = socket({
    cors: {
        origin: [
            process.env.APP_CLIENT_URL,
            process.env.APP_CRM_URL,
            "http://localhost:3002",
            "http://localhost:3003"
        ],
        credentials: true
    }
})

const socketConfig = (request, response, next) => {
    request.io = io
    next()
}

module.exports = {socketConfig, io}
