const Model = require('../../../config/knex.config');
const moment = require('moment')

class PromoCode extends Model {
    static tableName = 'promo_codes'

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {PromoCode}