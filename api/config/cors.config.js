const cors = require("cors")

const corsConfig = cors({
    origin: [
        process.env.APP_CLIENT_URL,
        process.env.APP_CRM_URL,
        "http://localhost:3002",
        "http://localhost:3003"
    ],
    credentials: true
})

module.exports = {corsConfig}
