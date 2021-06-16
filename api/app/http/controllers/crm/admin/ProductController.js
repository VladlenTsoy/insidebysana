const {Product} = require('models/products/Product')
const {ProductColor} = require('models/products/ProductColor')
const {ProductMeasurement} = require('models/products/ProductMeasurement')
const ProductColorService = require('services/product/ProductColorService')
const ProductMeasurementService = require('services/product/ProductMeasurementService')
const ProductTagService = require('services/product/ProductTagService')
const {body, validationResult} = require('express-validator');
const {logger} = require("config/logger.config");

const _getById = async (id) => {
    try {
        const basic = await Product.query().findById(id)
        let colors = await ProductColor.query().where({product_id: basic.id})

        colors = await Promise.all(
            colors.map(async (color) => {
                return {
                    id: color.id,
                    color_id: color.color_id,
                    sizes: Object.keys(color.sizes),
                    props: color.sizes,
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
    body('basic').not().isEmpty().withMessage('Введите основные!'),
    body('colors').not().isEmpty().withMessage('Введите цвета!'),
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
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

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
        if (measurements)
            await ProductMeasurementService.CreateOrUpdate(measurements, productRef.id)

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
    body('basic').not().isEmpty().withMessage('Введите основные!'),
    body('colors').not().isEmpty().withMessage('Введите цвета!'),
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
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

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
        if (measurements)
            await ProductMeasurementService.CreateOrUpdate(measurements, productRef.id)

        // Вывод продуктов цветов по продукту
        const productColors = await ProductColorService.FindProductColorsByProductId(productRef.id)

        // Вывод продукта
        const product = await _getById(productRef.id)

        return res.send({productColors, product})
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

module.exports = {CreateValidate, Create, GetById, EditValidate, EditById}