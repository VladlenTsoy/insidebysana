const {createLogger, format, transports} = require("winston")
const {combine, timestamp, prettyPrint} = format
const moment = require("moment")

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        prettyPrint()
        // simple()
    ),
    transports: [new transports.Console(), new transports.File({filename: "logs/error.log", level: "error"})]
})

const paymeLogger = createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/payme-error.log", level: "error"})
    ]
})

const eskizLogger = createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/eskiz-error.log", level: "error"})
    ]
})

module.exports = {logger, paymeLogger, eskizLogger}
