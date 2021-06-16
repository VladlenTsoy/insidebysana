const Model = require('../../../config/knex.config');
const moment = require('moment')

class Category extends Model {
    static tableName = 'categories'

    static get relationMappings() {
        return {
            // Категория
            sub_categories: {
                filter: query => query.select('id', 'title', 'category_id'),
                relation: Model.HasManyRelation,
                modelClass: Category,
                join: {
                    from: 'categories.id',
                    to: 'categories.category_id',
                },
            },
        }
    }

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

module.exports = {Category}