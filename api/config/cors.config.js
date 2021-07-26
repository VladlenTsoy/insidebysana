const cors = require("cors")

const corsConfig = cors({
    origin: true,
    credentials: true
})

module.exports = {corsConfig}
