const Model = require("../../../config/knex.config")
const moment = require("moment")

class AdditionalService extends Model {
    static tableName = "additional_services"
    static virtualAttributes = ["url_image"]
    static jsonAttributes = ["display"]

    url_image() {
        if (this.image) return `${process.env.APP_URL}/${this.image}`
    }

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {AdditionalService}
