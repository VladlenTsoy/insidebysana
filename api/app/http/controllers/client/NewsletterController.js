const {logger} = require("config/logger.config");
const {body, validationResult} = require('express-validator');
const {Newsletter} = require('models/settings/Newsletter');
const md5 = require('md5');

const SubscribeValidate = [
    body('email').isEmail().withMessage('Введен неверный E-mail!'),
]

/**
 * Подписаться
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const Subscribe = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    try {
        const {email} = req.body
        const check = await Newsletter.query().findOne({email})

        if (check)
            return res.send({status: "success", message: "1"})

        const token = md5(email)
        await Newsletter.query().insert({email, token})

        return res.send({status: "success", message: "2"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {SubscribeValidate, Subscribe}