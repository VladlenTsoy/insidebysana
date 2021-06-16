const Model = require('../../config/knex.config');
const moment = require('moment')
const Password = require('objection-password')();

class User extends Model {
    static tableName = 'users'
    static hidden = ['password']

    static get modifiers() {
        return {
            /**
             * Поиск
             * @param builder
             * @param search
             */
            search(builder, search) {
                if (search.trim() !== '')
                    builder.where((_builder) => {
                        _builder.where('id', 'LIKE', `%${search}%`)
                            .orWhere('full_name', 'LIKE', `%${search}%`)
                            .orWhere('email', 'LIKE', `%${search}%`)
                    });
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

module.exports = {User, UserPassword: Password(User)}