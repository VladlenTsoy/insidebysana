const Model = require('../../../config/knex.config');

class PaymeTransaction extends Model {
    static tableName = 'payme_transactions'

    // $beforeInsert() {
    //     this.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    //     this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    // }
    //
    // $beforeUpdate() {
    //     this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    // }
}

module.exports = {PaymeTransaction}