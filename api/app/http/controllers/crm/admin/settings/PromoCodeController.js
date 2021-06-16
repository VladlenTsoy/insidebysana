const {logger} = require("config/logger.config");
const {body, validationResult} = require('express-validator');
const {PromoCode} = require("models/settings/PromoCode")

/**
 * Вывод всех
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const promoCodes = await PromoCode.query()
            .select('id', 'code', 'type', 'discount', 'status', 'end_at', 'created_at')
        return res.send(promoCodes)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const CreateValidate = [
    body('code').not().isEmpty().withMessage('Введите код!'),
    body('type').not().isEmpty().withMessage('Выберите тип!'),
    body('discount').not().isEmpty().withMessage('Введите размер скидки!'),
]

/**
 * Создать
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

    try {
        const {code, type, discount, end_at} = req.body

        const promoCode = await PromoCode.query()
            .insertAndFetch({code, type, discount, end_at})
            .select('id', 'code', 'type', 'discount', 'status', 'end_at', 'created_at')

        return res.send(promoCode)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактировать
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

    try {
        const {id} = req.params
        const {code, type, discount, end_at, status} = req.body

        const promoCode = await PromoCode.query()
            .updateAndFetchById(id, {code, type, discount, end_at, status})
            .select('id', 'code', 'type', 'discount', 'status', 'end_at', 'created_at')

        return res.send(promoCode)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, CreateValidate, Create, Edit}