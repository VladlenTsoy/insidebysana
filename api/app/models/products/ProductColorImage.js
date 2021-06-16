const Model = require('config/knex.config');
const moment = require('moment')

class ProductColorImage extends Model {
    static tableName = 'product_color_images'
    static hidden = ['updated_at']
    static virtualAttributes = ['url', 'status', 'name', 'size', 'uid']

    uid() {
        return String(this.id);
    }

    name() {
        return `image.${this.id}.jpeg`;
    }

    size() {
        return 0;
    }

    url() {
        if (this.image)
            return `${process.env.APP_URL}/${this.image}`;
    }

    status() {
        return 'done'
    }

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {ProductColorImage}