const Model = require('../../../config/knex.config');
const moment = require('moment')

class FacebookChat extends Model {
    static tableName = 'facebook_chats'
    static hidden = ['updated_at']

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {FacebookChat}
