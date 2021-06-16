const Model = require("../../../config/knex.config")
const moment = require("moment")

class Country extends Model {
    static tableName = "countries"
    static hidden = ["flag", "updated_at"]
    static virtualAttributes = ["url_flag"]

    url_flag() {
        if (this.flag) return `${process.env.APP_URL}/${this.flag}`
    }

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {Country}
