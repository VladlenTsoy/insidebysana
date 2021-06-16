const {Status} = require("models/orders/Status")
const {raw} = require("objection")
const {logger} = require("config/logger.config")

/**
 * Вывод всех сделок
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const statuses = await Status.query().select("*")
        return res.send(statuses)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Создать статус
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title, sms, access} = req.body
        const lastStatus = await Status.query().orderBy("position", "desc").findOne({})
        const status = await Status.query().insertAndFetch({
            title,
            position: lastStatus ? lastStatus.position + 1 : 0,
            access,
            fixed: 0,
            sms
        })
        return res.send(status)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Обновление
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Update = async (req, res) => {
    try {
        const {id} = req.params
        const {title, conditions, sms, access} = req.body
        const data = {title, access}

        if (sms) data.sms = sms
        else data.sms = null

        if (conditions) data.conditions = conditions
        else data.conditions = null

        const status = await Status.query().updateAndFetchById(id, data)
        return res.send(status)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Обновление позиции
 * @return {Promise<*>}
 * @constructor
 */
const UpdatePosition = async (req, res) => {
    try {
        const {id} = req.params
        const {position, prev_position} = req.body
        const status = await Status.query().updateAndFetchById(id, {position: position})
        if (position < prev_position) {
            await Status.query()
                .where("position", ">=", position)
                .where("position", "<=", prev_position)
                .whereNot({id: status.id})
                .update({position: raw("position + 1")})
        } else if (position > prev_position) {
            await Status.query()
                .where("position", ">=", prev_position)
                .where("position", "<=", position)
                .whereNot({id: status.id})
                .update({position: raw("position - 1")})
        }
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Update, Create, UpdatePosition}
