exports.up = function (knex) {
    return knex.schema.createTable('product_colors', function (table) {
        table.increments('id')
        table.integer('product_id').notNullable()
        table.integer('color_id').notNullable()
        table.string('thumbnail')
        table.jsonb('sizes').notNullable()
        table.integer('hide_id')
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('product_colors')
};
