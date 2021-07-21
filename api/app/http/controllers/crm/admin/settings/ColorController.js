const {Color} = require("models/settings/Color")
const {ProductColor} = require("models/products/ProductColor")
const {body, validationResult} = require("express-validator")
const {logger} = require("config/logger.config")

const CreateValidate = [
    body("title").not().isEmpty().withMessage("Введите название цвета!"),
    body("hex").not().isEmpty().withMessage("Выберите цвет!")
]

/**
 * Создание цвета
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
        const {title, hex} = req.body
        const color = await Color.query().insertAndFetch({title, hex})
        return res.send(color)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редакьтровать цвет
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        const {id} = req.params
        const {title, hex} = req.body
        const color = await Color.query().updateAndFetchById(id, {title, hex})
        return res.send(color)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление цвета
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const productColors = await ProductColor.query().where("color_id", id)

        if (productColors.length)
            return res
                .status(500)
                .send({status: "warning", message: "Невозможно удалить! Данный цвет используют!"})
        else await Color.query().deleteById(id)

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод всех цветов
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const colors = await Color.query().select("id", "title", "hex", "hide_id")
        return res.send(colors)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Hide = async (req, res) => {
    try {
        const {id} = req.params
        const user = req.user
        const color = await Color.query().updateAndFetchById(id, {hide_id: user.id})
        return res.send(color)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Display = async (req, res) => {
    try {
        const {id} = req.params
        const color = await Color.query().updateAndFetchById(id, {hide_id: null})
        return res.send(color)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {CreateValidate, Create, GetAll, Edit, Delete, Hide, Display}
