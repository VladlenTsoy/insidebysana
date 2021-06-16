const axios = require("axios")
const {EskizOauthAccessToken} = require("models/auth/EskizOauthAccessToken")
const {eskizLogger} = require("config/logger.config")
const FormData = require("form-data")
const moment = require("moment")

const Auth = async () => {
    const form = new FormData()
    form.append("email", process.env.ESKIZ_EMAIL)
    form.append("password", process.env.ESKIZ_PASSWORD)

    return await axios({
        url: "https://notify.eskiz.uz/api/auth/login",
        method: "post",
        headers: {
            ...form.getHeaders()
        },
        data: form
    })
}

const CheckAuth = async () => {
    try {
        const eskizAuth = await EskizOauthAccessToken.query().findOne("expires_at", ">", "CURDATE()")
        if (eskizAuth) return eskizAuth.token
    } catch (e) {
        eskizLogger.error(e.stack)
    }

    try {
        const response = await Auth()
        const token = response.data.data.token
        await EskizOauthAccessToken.query().insert({
            token,
            expires_at: moment().add(30, "days").format("YYYY-MM-DD HH:mm:ss")
        })

        return response.data.data.token
    } catch (e) {
        eskizLogger.error(e.stack)
    }
    return null
}

const Send = async (token, phone, message) => {
    const form = new FormData()
    form.append("mobile_phone", phone)
    form.append("message", message)
    form.append("from", process.env.ESKIZ_FROM)

    try {
        const response = await axios({
            url: "https://notify.eskiz.uz/api/message/sms/send",
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
                ...form.getHeaders()
            },
            data: form
        })
        // data: {
        // id: 4290927,
        // status: 'waiting',
        // message: 'Waiting for SMS provider'
        //   }
        return response.data
    } catch (e) {
        eskizLogger.error(e.stack)
        eskizLogger.error(e.message)
    }
}

const SendMessage = async (phone, message) => {
    try {
        const updatePhone = phone.replace(/[^0-9]/g, "")

        const token = await CheckAuth()
        if (token) await Send(token, updatePhone, message)
    } catch (e) {
        eskizLogger.error(e.stack)
    }
}

module.exports = {SendMessage}
