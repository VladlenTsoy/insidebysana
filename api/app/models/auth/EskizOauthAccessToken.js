const Model = require('../../../config/knex.config');
const moment = require('moment')

class EskizOauthAccessToken extends Model {
    static tableName = 'eskiz_oauth_access_tokens'

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {EskizOauthAccessToken};