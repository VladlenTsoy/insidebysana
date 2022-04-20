const {Order} = require("models/orders/Order")
const {OrderProductColor} = require("models/orders/OrderProductColor")
const {logger} = require("config/logger.config")
const {Client} = require("models/Client")
const moment = require("moment")
const {raw} = require("objection")

const GetStatistic = async (req, res) => {
    try {
        const {dateFrom, dateTo, type} = req.body
        let momentFrom = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
        let momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")

        if (type === "custom") {
            momentFrom = moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss")
            momentTo = moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")
        } else {
            if (type === "today") {
                momentFrom = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "yesterday") {
                momentFrom = moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().subtract(1, "days").endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "7d") {
                momentFrom = moment().subtract(7, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "30d") {
                momentFrom = moment().subtract(30, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "3m") {
                momentFrom = moment().subtract(3, "months").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "3m") {
                momentFrom = moment().subtract(3, "months").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "6m") {
                momentFrom = moment().subtract(6, "months").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            } else if (type === "12m") {
                momentFrom = moment().subtract(12, "months").startOf("day").format("YYYY-MM-DD HH:mm:ss")
                momentTo = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
            }
        }

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
                momentFrom,
                momentTo
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
                momentFrom,
                momentTo
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
                momentFrom,
                momentTo
            ])

        response.numberOfOnlineOrders = (await numberOfOnlineOrders)[0]?.total || 0


        const averageCheck = Order.query()
            .where(builder => {
                builder.whereNull("status_id")
                    .orWhere("status_id", 16)
            }).avg({total: "total_price"})
        if (dateFrom && dateTo)
            averageCheck.whereBetween("created_at", [
                momentFrom,
                momentTo
            ])

        response.averageCheck = (await averageCheck)[0]?.total || 0


        const numberOfNewClients = Client.query()
            .count("*", {as: "total"})
        if (dateFrom && dateTo)
            numberOfNewClients.whereBetween("created_at", [
                momentFrom,
                momentTo
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
                momentFrom,
                momentTo
            ])

        response.revenueByDay = await revenueByDay


        const numberOfPositions = OrderProductColor.query()
            .count("*", {as: "total"})

        if (dateFrom && dateTo)
            numberOfPositions.whereBetween("created_at", [
                momentFrom,
                momentTo
            ])

        response.numberOfPositions = (await numberOfPositions)[0]?.total || 0

        res.send(response)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetStatistic}
