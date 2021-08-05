const {ProductColor} = require("models/products/ProductColor")
const {Size} = require("models/settings/Size")
const {Product} = require("models/products/Product")
const {Category} = require("models/settings/Category")
const {Color} = require("models/settings/Color")
const {logger} = require("config/logger.config")
const {body, validationResult} = require("express-validator")
const {HomeProduct} = require("models/products/HomeProduct")
const {uniq} = require("lodash")

const _getFilters = async ({colorIds, categoryId, sizeIds, subCategoryIds, price}) => {
    const response = {
        colors: [],
        sizes: [],
        categories: [],
        price: {min: 0, max: 0}
    }

    // Вывод размеров
    const productSize = await ProductColor.query()
        .modify("filterCategory", categoryId)
        .modify("filterSubCategoryIn", subCategoryIds)
        .modify("filterColors", colorIds)
        .modify("filterPrice", price)
        .where("product_colors.hide_id", null)
        .select("sizes")
    const productSizeIds = productSize.reduce((state, val) => [...state, ...Object.keys(val.sizes)], [])
    response.sizes = await Size.query()
        .where({hide_id: null})
        .whereIn("id", productSizeIds)
        .select("id", "title")

    // Вывод под категорий
    const productCategoryIds = await ProductColor.query()
        .modify("filterCategory", categoryId)
        .modify("filterSizes", sizeIds)
        .modify("filterColors", colorIds)
        .modify("filterPrice", price)
        .join("products", "products.id", "product_colors.product_id")
        .where("product_colors.hide_id", null)
        .select("products.category_id")
        .pluck("category_id")
    response.categories = await Category.query().whereIn("id", productCategoryIds).select("id", "title")

    // Вывод цветов
    const productColorIds = await ProductColor.query()
        .modify("filterCategory", categoryId)
        .modify("filterSubCategoryIn", subCategoryIds)
        .modify("filterSizes", sizeIds)
        .modify("filterPrice", price)
        .where("product_colors.hide_id", null)
        .select("color_id")
        .pluck("color_id")
    response.colors = await Color.query()
        .where({hide_id: null})
        .whereIn("id", productColorIds)
        .select("id", "title", "hex")

    // Вывод прайса
    response.price = await ProductColor.query()
        .join("products", "products.id", "product_colors.product_id")
        .modify("filterCategory", categoryId)
        .modify("filterSubCategoryIn", subCategoryIds)
        .modify("filterSizes", sizeIds)
        .findOne("product_colors.hide_id", null)
        .min("products.price as min")
        .max("products.price as max")

    return response
}

/**
 * Вывод продуктов пагинация
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetPagination = async (req, res) => {
    try {
        const {categoryId, sizeIds, colorIds, subCategoryIds, price, sort} = req.body
        const products = await ProductColor.query()
            .withGraphFetched(
                `[
                discount(),
                color(),                
            ]`
            )
            .join("products", "products.id", "product_colors.product_id")
            .orderBy(`products.${sort.column}`, sort.dir)
            .modify("filterCategory", categoryId)
            .modify("filterSubCategoryIn", subCategoryIds)
            .modify("filterSizes", sizeIds)
            .modify("filterColors", colorIds)
            .modify("filterPrice", price)
            .where("product_colors.thumbnail", "IS NOT", null)
            .where("product_colors.hide_id", null)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "products.title",
                "products.category_id",
                "products.price",
                "product_colors.is_new"
            )

        // Вывод фильров
        const filters = await _getFilters(req.body)

        return res.send({
            ...filters,
            products
        })
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод цвета продукта по Id
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params

        const product = await ProductColor.query()
            .findById(id)
            .withGraphFetched(
                `[
                sizes_props(),
                color(),                
                discount(),
                images(),
            ]`
            )
            .join("products", "products.id", "product_colors.product_id")
            .select(
                "product_colors.id",
                "product_colors.product_id",
                "products.properties",
                "products.title",
                "products.price"
            )

        const productColors = await ProductColor.query()
            .join("colors", "colors.id", "product_colors.color_id")
            .where("product_colors.product_id", product.product_id)
            .where("product_colors.thumbnail", "IS NOT", null)
            .where("product_colors.hide_id", null)
            .whereRaw(
                `exists(SELECT id FROM sizes WHERE JSON_EXTRACT(product_colors.sizes, concat('$."',sizes.id,'".qty')) > 0)`
            )
            .select("colors.id", "colors.title", "colors.hex", "product_colors.id as product_id")

        product.colors = productColors

        return res.send(product)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод продуктов по Product ID (ТЕГИ)
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetByProductId = async (req, res) => {
    try {
        const {productId} = req.params
        const currentProduct = await Product.query().findById(productId)

        if (!(currentProduct.tags_id && currentProduct.tags_id.length)) return res.send([])

        const products = await ProductColor.query()
            .withGraphFetched(
                `[
                discount(),
                color(),                
            ]`
            )
            .join("products", "products.id", "product_colors.product_id")
            .where("product_colors.hide_id", null)
            .where("product_colors.thumbnail", "IS NOT", null)
            .whereNot("product_colors.product_id", productId)
            .modify("filterTags", currentProduct.tags_id)
            .orderBy("product_colors.created_at", "desc")
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "products.title",
                "products.category_id",
                "products.price",
                "product_colors.is_new"
            )

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод новинок
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetNew = async (req, res) => {
    try {
        const homeProducts = await HomeProduct.query().orderBy("position", "desc")
        const ids = homeProducts.map(product => product.product_color_id)

        const products = await ProductColor.query()
            .withGraphFetched(
                `[
                discount(),
                color(),                
            ]`
            )
            .join("products", "products.id", "product_colors.product_id")
            .where("product_colors.hide_id", null)
            .where("product_colors.thumbnail", "IS NOT", null)
            .whereRaw(`product_colors.id IN (SELECT home_products.product_color_id FROM home_products)`)
            // .orderBy("product_colors.created_at", "desc")
            .orderByRaw(`FIELD(product_colors.id, ${ids.reverse().join(",")})`)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "products.title",
                "products.category_id",
                "products.price",
                "product_colors.is_new"
            )
            .limit(24)

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const SearchValidate = [body("search").not().isEmpty().withMessage("Введите название или SKU товара!")]

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Search = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        let {search} = req.body

        if (search.includes("PC")) {
            const [productColorId] = search.match(/\d+/g)
            search = productColorId
        }

        const products = await ProductColor.query()
            .withGraphFetched(
                `[
                discount(),
                color(),                
            ]`
            )
            .modify("search", search)
            .join("products", "products.id", "product_colors.product_id")
            .where("product_colors.hide_id", null)
            .where("product_colors.thumbnail", "IS NOT", null)
            .orderBy("product_colors.created_at", "asc")
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "products.title",
                "products.category_id",
                "products.price",
                "product_colors.is_new"
            )

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Недавно просмотренные продукты
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetByRecentIds = async (req, res) => {
    try {
        const {ids, productColorId} = req.body
        const products = await ProductColor.query()
            .withGraphFetched(
                `[
                discount(),
                color(),                
            ]`
            )
            .whereIn("product_colors.id", ids)
            .whereNot("product_colors.id", productColorId)
            .join("products", "products.id", "product_colors.product_id")
            .where("product_colors.hide_id", null)
            .where("product_colors.thumbnail", "IS NOT", null)
            .orderByRaw(`FIELD(product_colors.id, ${ids.reverse().join(",")})`)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "products.title",
                "products.category_id",
                "products.price",
                "product_colors.is_new"
            )

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetPagination, GetById, GetByProductId, GetNew, SearchValidate, Search, GetByRecentIds}
