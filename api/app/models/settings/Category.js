const Model = require("../../../config/knex.config")
const moment = require("moment")

class Category extends Model {
    static tableName = "categories"

    static get modifiers() {
        return {
            onlyActiveCategories(builder) {
                builder.whereRaw(
                    `id IN (
                        SELECT category_id FROM categories 
                        WHERE id IN (
                            SELECT category_id FROM products 
                            WHERE id IN (
                                SELECT product_colors.product_id FROM product_colors 
                                WHERE exists(
                                    SELECT id FROM sizes 
                                    WHERE JSON_EXTRACT(product_colors.sizes_props, concat('$."',sizes.id,'".qty')) > 0
                                )
                                AND hide_id IS NULL
                            )
                        )
                    )`
                )
            },
            onlyActiveSubCategories(builder) {
                builder.whereRaw(
                    `id IN (
                        SELECT category_id FROM products 
                        WHERE id IN (
                            SELECT product_colors.product_id FROM product_colors 
                            WHERE exists(
                                SELECT id FROM sizes 
                                WHERE JSON_EXTRACT(product_colors.sizes_props, concat('$."',sizes.id,'".qty')) > 0
                            )
                            AND hide_id IS NULL
                        )
                    )`
                )
            }
        }
    }

    static get relationMappings() {
        return {
            // Категория
            sub_categories: {
                filter: query => query.select("id", "title", "category_id"),
                relation: Model.HasManyRelation,
                modelClass: Category,
                join: {
                    from: "categories.id",
                    to: "categories.category_id"
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

module.exports = {Category}
