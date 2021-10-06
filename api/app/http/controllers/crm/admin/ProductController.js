const {Product} = require("models/products/Product")
const {ProductColor} = require("models/products/ProductColor")
const {ProductMeasurement} = require("models/products/ProductMeasurement")
const ProductColorService = require("services/product/ProductColorService")
const ProductMeasurementService = require("services/product/ProductMeasurementService")
const ProductTagService = require("services/product/ProductTagService")
const ImageService = require("services/image/ImageService")
const {body, validationResult} = require("express-validator")
const {logger} = require("config/logger.config")
const {HomeProduct} = require("models/products/HomeProduct")

const PATH_TO_FOLDER_TMP = "../../../public/images/tmp"
const PATH_TO_TMP = "images/tmp"
const PATH_TO_FOLDER_IMAGES = "../../../public/images/product-colors"
const PATH_TO_IMAGE = "images/product-colors"

const _getById = async id => {
    try {
        const basic = await Product.query().findById(id)
        let colors = await ProductColor.query().where({product_id: basic.id})

        colors = await Promise.all(
            colors.map(async color => {
                return {
                    id: color.id,
                    color_id: color.color_id,
                    sizes: Object.keys(color.sizes),
                    props: color.sizes
                }
            })
        )

        const measurements = await ProductMeasurement.query().where({product_id: basic.id})

        return {basic, colors, measurements}
    } catch (e) {
        logger.error(e.stack)
    }
}

const CreateValidate = [
    body("basic").not().isEmpty().withMessage("Введите основные!"),
    body("colors").not().isEmpty().withMessage("Введите цвета!")
]

/**
 * Создание продукта
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        const {basic, colors, measurements} = req.body

        // Найти или создать тег по названию
        const tagsId = await ProductTagService.FindOrCreate(basic.tags_id)

        const data = {
            category_id: basic.category_id,
            title: basic.title,
            price: basic.price,
            tags_id: tagsId,
            properties: basic.properties || []
        }

        // Создание продукта
        const productRef = await Product.query().insertAndFetch(data)

        // Сохранение или обновление цветов
        await ProductColorService.CreateOrUpdate(colors, productRef.id)

        // Сохранение или обновление обьемов
        if (measurements) await ProductMeasurementService.CreateOrUpdate(measurements, productRef.id)

        // Вывод продуктов цветов по продукту
        const productColors = await ProductColorService.FindProductColorsByProductId(productRef.id)

        // Вывод продукта
        const product = await _getById(productRef.id)

        return res.send({productColors, product})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const NewCreate = async (req, res) => {
    try {
        const data = req.body
        // Создание продукта
        const productRef = await Product.query().insertAndFetch({
            category_id: data.category_id,
            price: data.price,
            properties: data.properties || []
        })
        // Найти или создать тег по названию
        const tagsId = await ProductTagService.FindOrCreate(data.tags_id)
        // Создание цвета
        const productColor = await ProductColor.query().insertAndFetch({
            title: data.title,
            product_id: productRef.id,
            color_id: data.color_id,
            thumbnail: null,
            sizes: data.props,
            status: data.status,
            tags_id: tagsId,
            is_new: data.is_new
        })
        // Сохранение картинок
        if (data.images && data.images.length) {
            const updatedPathToImages = await Promise.all(
                data.images.map(async pathToImage => {
                    return await ImageService.MoveFile({
                        oldPath: `${PATH_TO_FOLDER_TMP}/${pathToImage}`,
                        newPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}/${pathToImage}`,
                        folderPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}`
                    })
                })
            )
        }
        // Сохранение или обновление обьемов
        if (data.measurements)
            await ProductMeasurementService.CreateOrUpdate(data.measurements, productRef.id)
        // Позиция на главной странице
        if (data.home_position)
            await HomeProduct.query().insert({
                product_color_id: productColor.id,
                position: data.home_position
            })

        return res.send(productColor)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод продукта по Id
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await _getById(id)
        return res.send(product)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const EditValidate = [
    body("basic").not().isEmpty().withMessage("Введите основные!"),
    body("colors").not().isEmpty().withMessage("Введите цвета!")
]

/**
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const EditById = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        const {id} = req.params
        const {basic, colors, measurements} = req.body

        // Найти или создать тег по названию
        const tagsId = await ProductTagService.FindOrCreate(basic.tags_id)

        const data = {
            category_id: basic.category_id,
            title: basic.title,
            price: basic.price,
            tags_id: tagsId,
            properties: basic.properties || []
        }

        // Создание продукта
        const productRef = await Product.query().updateAndFetchById(id, data)

        // Сохранение или обновление цветов
        await ProductColorService.CreateOrUpdate(colors, productRef.id)

        // Сохранение или обновление обьемов
        if (measurements) await ProductMeasurementService.CreateOrUpdate(measurements, productRef.id)

        // Вывод продуктов цветов по продукту
        const productColors = await ProductColorService.FindProductColorsByProductId(productRef.id)

        // Вывод продукта
        const product = await _getById(productRef.id)

        return res.send({productColors, product})
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

module.exports = {CreateValidate, Create, GetById, EditValidate, EditById, NewCreate}
