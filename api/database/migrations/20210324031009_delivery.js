exports.up = function(knex) {
    return knex.schema.createTable('delivery', function (table) {
        table.increments('id').notNullable()
        table.string('title').notNullable()
        table.integer('price').defaultTo(0)
        table.string('description')
        table.string('country')
        table.string('city')
        table.timestamps(true, true);
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('delivery')
}
