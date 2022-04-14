const {Order} = require("models/orders/Order")
const {OrderProductColor} = require("models/orders/OrderProductColor")
const {logger} = require("config/logger.config")
const {Client} = require("models/Client")
const moment = require("moment")
const {raw} = require("objection")

const GetStatistic = async (req, res) => {
    try {
        const {dateFrom, dateTo} = req.body
        const response = {
            revenue: 0,
            costs: 0,
            numberOfChecks: 0,
            numberOfPositions: 0,
            numberOfOnlineOrders: 0,
            numberOfNewClients: 0,
            averageCheck: 0,
            revenueByDay: []
        }

        const revenue = Order.query()
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            }).sum({total: "total_price"})
        if (dateFrom && dateTo)
            revenue.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.revenue = (await revenue)[0]?.total || 0

        const numberOfChecks = Order.query()
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            }).count("*", {as: "total"})
            .whereIn("source_id", [5, 6])
        if (dateFrom && dateTo)
            numberOfChecks.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.numberOfChecks = (await numberOfChecks)[0]?.total || 0


        const numberOfOnlineOrders = Order.query()
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            }).count("*", {as: "total"})
            .whereNotIn("source_id", [5, 6])
        if (dateFrom && dateTo)
            numberOfOnlineOrders.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.numberOfOnlineOrders = (await numberOfOnlineOrders)[0]?.total || 0


        const averageCheck = Order.query()
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            }).avg({total: "total_price"})
        if (dateFrom && dateTo)
            averageCheck.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.averageCheck = (await averageCheck)[0]?.total || 0


        const numberOfNewClients = Client.query()
            .count("*", {as: "total"})
        if (dateFrom && dateTo)
            numberOfNewClients.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.numberOfNewClients = (await numberOfNewClients)[0]?.total || 0


        const revenueByDay = Order.query()
            .select(raw(`DATE(created_at) AS date`))
            .sum({total: "total_price"})
            .groupBy("date")
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            })
        if (dateFrom && dateTo)
            revenueByDay.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.revenueByDay = await revenueByDay


        const numberOfPositions = OrderProductColor.query()
            .count("*", {as: "total"})

        if (dateFrom && dateTo)
            numberOfPositions.whereBetween("created_at", [
                moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
                moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
            ])

        response.numberOfPositions = (await numberOfPositions)[0]?.total || 0

        res.send(response)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetStatistic}
