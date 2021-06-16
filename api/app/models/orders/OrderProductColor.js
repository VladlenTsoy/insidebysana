const Model = require("../../../config/knex.config")
const moment = require("moment")

class OrderProductColor extends Model {
    static tableName = "order_product_colors"

    static get relationMappings() {
        const {ProductColor} = require("../products/ProductColor")
        const {Size} = require("../settings/Size")

        return {
            product: {
                filter: query => query.select("id", "thumbnail", "product_id", "sizes"),
                relation: Model.HasOneRelation,
                modelClass: ProductColor,
                join: {
                    from: "order_product_colors.product_color_id",
                    to: "product_colors.id"
                }
            },
            details: {
                filter: query =>
                    query
                        .join("products", "products.id", "product_colors.product_id")
                        .select("product_colors.id", "products.title", "product_colors.thumbnail"),
                relation: Model.HasOneRelation,
                modelClass: ProductColor,
                join: {
                    from: "order_product_colors.product_color_id",
                    to: "product_colors.id"
                }
            },
            size: {
                filter: query => query.select("sizes.id", "sizes.title"),
                relation: Model.HasOneRelation,
                modelClass: Size,
                join: {
                    from: "order_product_colors.size_id",
                    to: "sizes.id"
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

module.exports = {OrderProductColor}
