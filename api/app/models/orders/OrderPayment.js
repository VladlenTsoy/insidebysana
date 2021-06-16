const Model = require("../../../config/knex.config")
const moment = require("moment")

class OrderPayment extends Model {
    static tableName = "order_payments"

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {OrderPayment}
