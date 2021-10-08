const Model = require("../../../config/knex.config")
const moment = require("moment")
const {raw, ref} = require("objection")

class ProductColor extends Model {
    static tableName = "product_colors"
    static virtualAttributes = ["url_thumbnail", "url_images"]
    static jsonAttributes = ["sizes", "tags_id", "sizes_props"]
    static hidden = ["thumbnail"]

    static get jsonSchema() {
        return {
            type: "object",
            // required: ['product_id', 'color_id', 'images', 'sizes'],
            properties: {
                id: {type: "integer"},
                product_id: {type: "number"},
                color_id: {type: "number"},
                thumbnail: {type: ["string", null]},
                sizes: {type: ["array"]},
                sizes_props: {
                    type: "object",
                    properties: {
                        type: {
                            type: "string"
                        },
                        value: {
                            qty: {type: "number"},
                            min_qty: {type: "number"},
                            cost_price: {type: "number"}
                        }
                    }
                },
                created_at: {type: "string"},
                updated_at: {type: "string"}
            }
        }
    }

    url_thumbnail() {
        if (this.thumbnail) return `${process.env.APP_URL}/${this.thumbnail}`
    }

    static get modifiers() {
        return {
            /**
             * Фильтр по категориям
             * @param builder
             * @param categoryId
             */
            filterCategory(builder, categoryId) {
                if (categoryId && categoryId.match(/^\d+/) && Number(categoryId) !== 0)
                    builder.whereRaw(
                        `product_id IN (SELECT id FROM products WHERE category_id IN (SELECT id FROM categories WHERE category_id = ${categoryId}))`
                    )
            },

            /**
             * Фильтр по подкатегориям
             * @param builder
             * @param subCategoryId
             */
            filterSubCategory(builder, subCategoryId) {
                if (Number(subCategoryId) !== 0)
                    builder.whereRaw(
                        `product_id IN (SELECT id FROM products WHERE category_id = ${subCategoryId})`
                    )
            },

            /**
             * Фильтр по подкатегориям
             * @param builder
             * @param subCategoryIds
             */
            filterSubCategoryIn(builder, subCategoryIds) {
                if (subCategoryIds && subCategoryIds.length)
                    builder.whereRaw(
                        `product_id IN (SELECT id FROM products WHERE category_id IN (${subCategoryIds.join(
                            ","
                        )}))`
                    )
            },

            /**
             * Поиск
             * @param builder
             * @param search
             */
            search(builder, search, isHide = false, ids = []) {
                if (search && search.trim() !== "") {
                    builder.whereRaw(
                        `product_colors.product_id IN (SELECT products.id FROM products WHERE products.title LIKE '%${search}%')`
                    )
                    if (isHide) builder.whereNotNull("hide_id")
                    else builder.where("hide_id", null).whereNotIn("id", ids)
                    if (ids) builder.whereNotIn("id", ids)

                    builder.orWhereRaw(
                        `product_colors.color_id IN (SELECT colors.id FROM colors WHERE colors.title LIKE '%${search}%')`
                    )
                    if (isHide) builder.whereNotNull("hide_id")
                    else builder.where("hide_id", null).whereNotIn("id", ids)
                    if (ids) builder.whereNotIn("id", ids)

                    builder.orWhere("product_colors.id", "LIKE", `%${search}%`)
                    if (isHide) builder.whereNotNull("hide_id")
                    else builder.where("hide_id", null)
                    if (ids) builder.whereNotIn("id", ids)
                }
            },

            /**
             * Фильтрация по размерам
             * @param builder
             * @param sizes
             */
            filterSizes(builder, sizes) {
                if (sizes && sizes.length)
                    builder.where(_builder =>
                        sizes.map(size =>
                            _builder.orWhereRaw(
                                `JSON_SEARCH(JSON_KEYS(sizes), 'all', ${String(size)}) IS NOT null`
                            )
                        )
                    )
            },

            /**
             * Фильтрация по tags
             * @param builder
             * @param tags
             */
            filterTags(builder, tags) {
                if (tags && tags.length)
                    builder
                        .join("tags", raw(`tags.id IN (${tags.join(", ")})`))
                        .whereRaw(`JSON_SEARCH(products.tags_id, 'all', tags.id) > 1`)
            },

            /**
             * Фильтрация по цветам
             * @param builder
             * @param colors
             */
            filterColors(builder, colors) {
                if (colors && colors.length)
                    builder.where(_builder => colors.map(color => _builder.orWhere({color_id: color})))
            },

            /**
             * Фильтрация по цене
             * @param builder
             * @param price
             */
            filterPrice(builder, price) {
                if (price && price.max !== 0)
                    builder.whereRaw(
                        `product_id IN (SELECT id FROM products WHERE price BETWEEN ${price.min} AND ${price.max})`
                    )
            }
        }
    }

    static get relationMappings() {
        const {Product} = require("./Product")
        const {ProductColorImage} = require("./ProductColorImage")
        const {Color} = require("../settings/Color")
        const {Category} = require("../settings/Category")
        const {ProductDiscount} = require("./ProductDiscount")
        const {ProductMeasurement} = require("./ProductMeasurement")

        return {
            details: {
                filter: query => query.select("products.id", "products.price"),
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: "product_colors.product_id",
                    to: "products.id"
                }
            },
            category: {
                filter: query => query.select("categories.id", "categories.title"),
                relation: Model.HasOneThroughRelation,
                modelClass: Category,
                join: {
                    from: "product_colors.product_id",
                    through: {
                        from: "products.id",
                        to: "products.category_id"
                    },
                    to: "categories.id"
                }
            },
            // sizes_props: {
            //     filter: query =>
            //         query
            //             .join(
            //                 `sizes`,
            //                 raw(`JSON_EXTRACT(product_colors.sizes,concat('$."',sizes.id,'".qty')) > 0`)
            //             )
            //             .select(
            //                 "sizes.id as size_id",
            //                 "sizes.title",
            //                 raw(`JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) as qty`)
            //             ),
            //     relation: Model.HasManyRelation,
            //     modelClass: ProductColor,
            //     join: {
            //         from: "product_colors.id",
            //         to: "product_colors.id"
            //     }
            // },
            colors: {
                filter: query =>
                    query
                        .where("product_colors.thumbnail", "IS NOT", null)
                        .where("product_colors.hide_id", null)
                        .select("colors.id", "colors.title", "colors.hex", "product_colors.id as product_id"),
                relation: Model.ManyToManyRelation,
                modelClass: Color,
                join: {
                    from: "product_colors.product_id",
                    through: {
                        from: "product_colors.product_id",
                        to: "product_colors.color_id"
                    },
                    to: "colors.id"
                }
            },
            color: {
                filter: query => query.select("colors.id", "colors.title", "colors.hex"),
                relation: Model.HasOneRelation,
                modelClass: Color,
                join: {
                    from: "product_colors.color_id",
                    to: "colors.id"
                }
            },
            discount: {
                filter: query =>
                    query
                        .where(builder => {
                            builder
                                .where("product_discounts.end_at", ">=", new Date())
                                .orWhere("product_discounts.end_at", null)
                        })
                        .andWhere("product_discounts.discount", "!=", 0)
                        .select("product_discounts.discount", "product_discounts.end_at"),
                relation: Model.HasOneRelation,
                modelClass: ProductDiscount,
                join: {
                    from: "product_colors.id",
                    to: "product_discounts.product_color_id"
                }
            },
            tags: {
                filter: query =>
                    query
                        .select("tags.id as tag_id", "tags.title")
                        .join("tags", raw(`JSON_SEARCH(product_colors.tags_id, 'all', tags.id) > 1`))
                        .select("tags.id", "tags.title"),
                relation: Model.HasManyRelation,
                modelClass: ProductColor,
                join: {
                    from: "product_colors.id",
                    to: "product_colors.id"
                }
            },
            images: {
                filter: query => query.orderBy("position", "desc").select("id", "name", "path", "size"),
                relation: Model.HasManyRelation,
                modelClass: ProductColorImage,
                join: {
                    from: "product_colors.id",
                    to: `product_color_images.product_color_id`
                }
            },
            measurements: {
                relation: Model.HasManyRelation,
                modelClass: ProductMeasurement,
                join: {
                    from: "product_colors.product_id",
                    to: `product_measurements.product_id`
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

module.exports = {ProductColor}
