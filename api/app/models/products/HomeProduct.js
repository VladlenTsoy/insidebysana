const Model = require("../../../config/knex.config")
const moment = require("moment")

class HomeProduct extends Model {
    static tableName = "home_products"

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {HomeProduct}
