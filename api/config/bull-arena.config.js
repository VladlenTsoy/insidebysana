const Arena = require("bull-arena")
const Bull = require("bull")

const queueNames = [
    "SendMessage",
    "AddAddressToOrder",
    "AddProductsToOrder",
    "AddAdditionalServiceToOrder",
    "UpdateStatusAndPositionToOrder"
]

const defaultHostConfig = {
    hostId: "redis",
    redis:
        process.env.APP_MODE === "development"
            ? {
                  host: process.env.REDIS_HOST,
                  port: process.env.REDIS_PORT
              }
            : {
                  path: process.env.REDIS_HOST
              }
}

const arena = Arena(
    {
        Bull,
        queues: queueNames.map(q => ({name: q, ...defaultHostConfig}))
    },
    {
        basePath: "/arena",
        disableListen: true
    }
)

module.exports = {arena}
