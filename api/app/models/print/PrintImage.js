const Model = require("config/knex.config")
const moment = require("moment")

class PrintImage extends Model {
    static tableName = "print_images"
    static hidden = ["image", "thumbnail"]
    static virtualAttributes = ["url_image", "url_thumbnail"]

    url_image() {
        if (this.image) return `${process.env.APP_URL}/${this.image}`
    }

    url_thumbnail() {
        if (this.thumbnail) return `${process.env.APP_URL}/${this.thumbnail}`
    }

    static get relationMappings() {
        const {PrintCategory} = require("./PrintCategory")

        return {
            // Категория
            category: {
                filter: query => query.select("id", "title"),
                relation: Model.HasOneRelation,
                modelClass: PrintCategory,
                join: {
                    from: "print_images.category_id",
                    to: "print_categories.id"
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

module.exports = {PrintImage}
