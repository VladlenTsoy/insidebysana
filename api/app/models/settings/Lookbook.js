const Model = require('../../../config/knex.config');
const moment = require('moment')

class Lookbook extends Model {
    static tableName = 'lookbook'
    static hidden = ['image']
    static virtualAttributes = ['url_image']

    url_image() {
        if (this.image)
            return `${process.env.APP_URL}/${this.image}`;
    }

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {Lookbook}