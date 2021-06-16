const Redis = require("ioredis")

const defaultJobOptions = {
    removeOnComplete: true,
    removeOnFail: false
}

const limiter = {
    max: 10000,
    duration: 1000,
    bounceBack: false
}

const settings = {
    lockDuration: 600000, // Время истечения срока действия ключа для блокировок заданий
    stalledInterval: 5000, // Как часто проверять наличие приостановленных заданий (используйте 0, чтобы никогда не проверять).
    maxStalledCount: 2, // Максимальное количество повторных обработок зависшего задания.
    guardInterval: 5000, // Интервал опроса отложенных и добавленных заданий.
    retryProcessDelay: 30000, // Задержка перед обработкой следующего задания в случае внутренней ошибки.
    drainDelay: 5 // Тайм-аут, когда очередь находится в опустошенном состоянии (пустое ожидание заданий).
}

const redis = {
    createClient() {
        return new Redis(process.env.REDIS_HOST, process.env.REDIS_PORT)
    }
}

module.exports = {redis, defaultJobOptions, limiter, settings}
