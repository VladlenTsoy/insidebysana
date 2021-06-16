const Model = require('../../../config/knex.config');
const moment = require('moment')

class Delivery extends Model {
    static tableName = 'delivery'
    static hidden = ['updated_at']

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {Delivery}