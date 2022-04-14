const Model = require("../../../config/knex.config")
const moment = require("moment")

class FacebookChat extends Model {
    static tableName = "facebook_chats"
    static hidden = ["updated_at"]
    static jsonAttributes = ["facebook_client"]

    static get relationMappings() {
        const {FacebookChatMessage} = require("./FacebookChatMessage")
        return {
            new_messages: {
                filter: query => query.where({user_id: null, read_at: null}),
                relation: Model.HasManyRelation,
                modelClass: FacebookChatMessage,
                join: {
                    from: "facebook_chats.id",
                    to: "facebook_chat_messages.chat_id"
                }
            },
            last_message: {
                filter: query => query.orderBy("created_at", "desc"),
                relation: Model.HasOneRelation,
                modelClass: FacebookChatMessage,
                join: {
                    from: "facebook_chats.id",
                    to: "facebook_chat_messages.chat_id"
                }
            }
        }
    }

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = {FacebookChat}
