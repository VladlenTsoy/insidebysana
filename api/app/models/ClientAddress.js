const Model = require("config/knex.config")
const moment = require("moment")

class ClientAddress extends Model {
    static tableName = "client_addresses"
    static jsonAttributes = ["position"]

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {ClientAddress}
