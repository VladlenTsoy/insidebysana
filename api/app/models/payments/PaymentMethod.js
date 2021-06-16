const Model = require('../../../config/knex.config');
const moment = require('moment')

class PaymentMethod extends Model {
    static tableName = 'payment_methods'

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {PaymentMethod}