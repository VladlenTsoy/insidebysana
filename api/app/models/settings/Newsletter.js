const Model = require('../../../config/knex.config');
const moment = require('moment')

class Newsletter extends Model {
    static tableName = 'newsletter'
    static hidden = ['token', 'updated_at']

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {Newsletter}