const Bull = require("bull")
const {redis, defaultJobOptions, settings, limiter} = require("config/bull-queue.config")
const EskizService = require("services/notify/EskizService")
const {logger} = require("config/logger.config")

/**
 * Конвертирование времени в милисекундах
 * @param {*} m
 * @returns
 */
const convertMinuteByMilliseconds = m => {
    return m * 60000
}

/**
 * Отправление сообщения
 * @param phone
 * @param message
 * @param timeout
 * @return {Promise<void>}
 * @constructor
 */
const SendMessageQueue = async ({phone, message, timeout}) => {
    try {
        // Создание очереди
        const Queue = new Bull("SendMessage", redis, defaultJobOptions, settings, limiter)
        const delay = convertMinuteByMilliseconds(timeout)

        // Действие очереди
        Queue.process(async ({data}) => {
            const {phone, message} = data
            return await EskizService.SendMessage(phone, message)
        })

        // Запуск очереди
        Queue.add({phone, message}, {delay})
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {SendMessageQueue}
