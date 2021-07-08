type passwordRulesType = (params: {required: boolean}) => any

export const passwordRules: passwordRulesType = ({required}) => {
    const rules = []

    required && rules.push({required: true, message: `Введите пароль!`})
    rules.push({min: 5, message: `Пароль должен содержать более 5 символов!`})
    rules.push({
        pattern: /^[A-Za-z0-9]+$/,
        whitespace: true,
        message: `Пароль должен содержать только цифры и латинские буквы!`
    })

    return rules
}

type emailRulesType = (params: {required: boolean}) => any

export const emailRules: emailRulesType = ({required}) => [
    {required: required, type: "email", message: "Введен неверный E-mail!"}
]
