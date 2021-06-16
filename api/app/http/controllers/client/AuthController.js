const {ClientPassword} = require('models/Client');
const {body, validationResult} = require('express-validator');
const SiteOauthAccessTokenService = require('services/auth/SiteOauthAccessTokenService');
const {logger} = require("config/logger.config");

const LoginValidate = [
    body('email').isEmail().withMessage('Введен неверный E-mail!'),
    body('password').isLength({min: 6}).withMessage('Пароль должен содержать более 5 символов!')
];

const Login = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

    try {
        const {email, password} = req.body

        // Поиск пользователя по почте
        const user = await ClientPassword.query().findOne({email})
        if (!user)
            return res.status(500).send({message: 'Ошибка! Почта не найдена!'})

        // TODO - исправить если есть клиент без регистрации
        if (!user.password)
            return res.status(500).send({message: 'Ошибка! Введен неправильный пароль!!'})

        // Проверка паролей
        const isMatch = await user.verifyPassword(password);
        if (!isMatch)
            return res.status(500).send({message: 'Ошибка! Введен неправильный пароль!'})

        // Создание токена
        const token = await SiteOauthAccessTokenService.Create(user.id)

        res.send({token});
    } catch (e) {
        logger.error(e.stack);
        return res.status(500).send({message: e.message});
    }
}


const RegistrationValidate = [
    body('full_name').not().isEmpty().withMessage('Введите имя!'),
    body('email').isEmail().withMessage('Введите E-mail!'),
    body('password').isLength({min: 6}).withMessage('Пароль должен содержать более 5 символов!')
];

const Registration = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});

    try {
        const {email, password, full_name} = req.body

        // TODO - email if create client
        // Поиск пользователя по почте
        const checkClient = await ClientPassword.query().findOne({email})
        if (checkClient)
            return res.status(500).send({message: 'Ошибка! Почта уже существует!'})

        const client = await ClientPassword.query().insertAndFetch({
            email, password, full_name, source_id: 3
        })

        // Создание токена
        const token = await SiteOauthAccessTokenService.Create(client.id)
        res.send({token});
    } catch (e) {
        logger.error(e.stack);
        return res.status(500).send({message: e.message})
    }
}

module.exports = {LoginValidate, Login, RegistrationValidate, Registration}