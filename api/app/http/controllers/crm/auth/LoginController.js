const {UserPassword} = require('models/User');
const {body, validationResult} = require('express-validator');
const CrmOauthAccessTokenService = require('services/auth/CrmOauthAccessTokenService');
const {logger} = require("config/logger.config");

const Validate = [
    body('email').isEmail().withMessage('Введен неверный E-mail!'),
    body('password').isLength({min: 6}).withMessage('Пароль должен содержать более 5 символов!')
];

const Index = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

    try {
        const {email, password, remember} = req.body

        // Поиск пользователя по почте
        const user = await UserPassword.query().findOne({email})
        if (!user)
            return res.status(500).send({message: 'Ошибка! Почта не найдена!'})

        // Проверка паролей
        const isMatch = await user.verifyPassword(password);
        if (!isMatch)
            return res.status(500).send({message: 'Ошибка! Введен неправильный пароль!'})

        // Создание токена
        const token = await CrmOauthAccessTokenService.Create(user.id, remember)

        res.send({token});
    } catch (e) {
        logger.error(e.stack);
        return res.status(500).send({message: e.message});
    }
}

module.exports = {Validate, Index}