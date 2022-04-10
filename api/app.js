require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const timeout = require("connect-timeout")
const socketChannels = require("./channels/index")
require("module-alias/register")

const app = express()

app.use(timeout("120s"))
app.use(logger("dev"))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

/* Custom Config */
const {corsConfig} = require("./config/cors.config")
const {socketConfig, io} = require("./config/socket.config")
const socketPassport = require("./app/http/middleware/socket-passport")

app.use(corsConfig)
app.use(socketConfig)

/* Сокеты */
app.io = io
app.io.use(socketPassport)
app.io.on("connection", socketChannels)

/* Вывод арены очередей */
const {arena} = require("./config/bull-arena.config")
app.use("/", arena)

/* Машруты */
const apiRouter = require("./routes/api")
app.use("/api", apiRouter)

/* Промежуточная проверка */
const clientPassportMiddleware = require("./app/http/middleware/client-password")
const crmPassportMiddleware = require("./app/http/middleware/crm-passport")

const userRouter = require("./routes/user")
const clientRouter = require("./routes/client")
const cashierRouter = require("./routes/cashier")
const managerRouter = require("./routes/manager")
const adminRouter = require("./routes/admin")
const facebookRouter = require("./routes/facebook")

app.use("/api/client", clientPassportMiddleware, clientRouter)
app.use("/api/user", crmPassportMiddleware, userRouter)
app.use("/api/user/cashier", crmPassportMiddleware, cashierRouter)
app.use("/api/user/manager", crmPassportMiddleware, managerRouter)
app.use("/api/user/admin", crmPassportMiddleware, adminRouter)
app.use("/api/facebook", facebookRouter)

module.exports = app
