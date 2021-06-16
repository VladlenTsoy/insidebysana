const {logger} = require("config/logger.config")
const {Lookbook} = require("models/settings/Lookbook")

const GetAll = async (req, res) => {
    try {
        const lookbook = await Lookbook.query()
            .orderBy('position', 'asc')

        return res.send(lookbook)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll}