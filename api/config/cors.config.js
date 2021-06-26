const cors = require("cors")

const corsConfig = cors({
    origin: [process.env.APP_CLIENT_URL, process.env.APP_CRM_URL, "http://localhost:5000"],
    credentials: true
})

module.exports = {corsConfig}
