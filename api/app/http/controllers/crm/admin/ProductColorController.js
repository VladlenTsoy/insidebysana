const {ProductColor} = require("models/products/ProductColor")
const {ProductColorImage} = require("models/products/ProductColorImage")
const {Product} = require("models/products/Product")
const ImageService = require("services/image/ImageService")
const {raw} = require("objection")
const {logger} = require("config/logger.config")

// Ссылка на папку с картинками
const IMAGES_FOLDER_PATH = "../../../public/images/products/"

/**
 * Вывод всех продуктов-цветов пагинация
 * @param req
 * @param res
 * @return {*}
 * @constructor
 */
const GetAllPaginate = async (req, res) => {
    try {
        const {type, categoryIds, sizeIds, search, pagination, sorter} = req.body

        const productColorsRef = ProductColor.query()
            .withGraphFetched(`[details, tags, color, discount, category]`)
            // .join("tags", raw(`JSON_SEARCH(product_colors.tags_id, 'all', tags.id) > 1`))
            .modify("filterSubCategoryIn", categoryIds)
            .modify("filterSizes", sizeIds)
            // .modify("search", search)
            .whereRaw(`product_colors.title LIKE '%${search}%'`)
            .select(
                "product_colors.id",
                "product_colors.thumbnail",
                "product_colors.created_at",
                "product_colors.sizes_props",
                "product_colors.is_new",
                "product_colors.title",
                "product_colors.status"
            )

        const order = sorter.order === "ascend" ? "asc" : "desc"

        // Сортировка по кол-ву размеров в цвете JSON
        if (sorter.field) {
            if (sorter.field.includes("sizes"))
                productColorsRef.orderBy(raw(`JSON_EXTRACT(sizes, '$."${sorter.field[1]}".qty')`), order)
            // Сортировка
            else if (sorter.field.includes("details"))
                productColorsRef
                    .join("products", "products.id", "product_colors.product_id")
                    .orderBy(`products.${sorter.field[1]}`, order)
            // Сортировка по столбцу
            else productColorsRef.orderBy(sorter.field, order)
        }

        if (type !== "all") {
            productColorsRef.where("product_colors.hide_id", null).where("product_colors.status", type)
        }

        const productColors = await productColorsRef.page(pagination.current - 1, pagination.pageSize)

        return res.send(productColors)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Hide = async (req, res) => {
    try {
        const {productColorId} = req.params
        const user = req.user

        await ProductColor.query().updateAndFetchById(productColorId, {hide_id: user.id})

        return res.send(productColorId)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод продуктов из корзины
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetFromTrash = async (req, res) => {
    try {
        const productColors = await ProductColor.query()
            .withGraphFetched(
                `[
                details(),
                tags(),
                color(),
                discount(),
                category(),
            ]`
            )
            .where("product_colors.hide_id", "IS NOT", null)
            .select("product_colors.id", "product_colors.thumbnail", "product_colors.created_at", "sizes")

        return res.send(productColors)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetBySearch = async (req, res) => {
    try {
        const {search} = req.body

        const products = await ProductColor.query()
            .select("id", "thumbnail", "product_id", "sizes")
            .withGraphFetched(
                `[
                details(),
                discount(),
                color
            ]`
            )
            .modify("search", search)

        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удалить цвет продукта
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {productColorId} = req.params
        //  Проверка наличии цвета
        const productColor = await ProductColor.query().findById(productColorId)
        if (productColor) {
            // Проверяем остальные цвета
            const productColors = await ProductColor.query().where({product_id: productColor.product_id})
            if (!(productColors && productColors.length > 1))
                // Удаляем товар
                await Product.query().where({id: productColor.product_id}).delete()

            // Удаляем цвет товара
            await ProductColor.query().deleteById(productColorId)
            // Удаляем папку с картинками
            await ImageService.DeleteFolder(`${IMAGES_FOLDER_PATH}${productColor.id}`)
        }
        // Если товар ненайден
        else return res.status(500).send({message: "Товар не найден!"})

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Return = async (req, res) => {
    try {
        const {productColorId} = req.params
        await ProductColor.query().findById(productColorId).update({hide_id: null})
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const UpdateIsNew = async (req, res) => {
    try {
        const {productColorId} = req.params
        const {isNew} = req.body

        await ProductColor.query().findById(productColorId).update({is_new: isNew})
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetImagesById = async (req, res) => {
    try {
        const {id} = req.params
        const images = await ProductColorImage.query()
            .where("product_color_id", id)
            .orderBy("position", "asc")
            .select("id", "path")
        return res.send(images)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAllPaginate, Hide, GetBySearch, GetFromTrash, Delete, Return, UpdateIsNew, GetImagesById}
