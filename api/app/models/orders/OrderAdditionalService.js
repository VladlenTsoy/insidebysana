const Model = require("../../../config/knex.config")
const moment = require("moment")

class OrderAdditionalService extends Model {
    static tableName = "order_additional_services"

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {OrderAdditionalService}
