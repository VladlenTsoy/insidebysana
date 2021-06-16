const {logger} = require("config/logger.config")
const {PaymeService} = require("services/payment/PaymeService")

const Index = async (req, res) => {
    try {
        const paymeSerive = new PaymeService(req, res)
        return await paymeSerive.Run()
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Index}
