exports.up = function (knex) {
    return knex.schema.createTable("home_products", function (table) {
        table.increments("id").notNullable()
        table.integer("product_color_id")
        table.integer("position")
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("print_products")
}
