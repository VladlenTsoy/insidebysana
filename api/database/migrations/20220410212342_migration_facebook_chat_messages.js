exports.up = function(knex) {
    return knex.schema.createTable("facebook_chat_messages", function(table) {
        table.increments("id").notNullable()
        table.integer("chat_id")
        table.string("message")
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("facebook_chat_messages")
}
