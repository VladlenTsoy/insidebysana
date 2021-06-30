const {PrintProduct} = require("models/print/PrintProduct")
const {logger} = require("config/logger.config")

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetByPrintImageId = async (req, res) => {
    try {
        const {print_image_id} = req.params
        const printProducts = await PrintProduct.query()
            .where({print_image_id: print_image_id})
            .withGraphFetched("[product_color]")
            .select("id", "title", "product_color_id", "print_image_id", "thumbnail", "image")
        return res.send(printProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetLatest = async (req, res) => {
    try {
        const printProducts = await PrintProduct.query()
            .orderBy("created_at", "asc")
            .withGraphFetched("[product_color]")
            .select("id", "title", "product_color_id", "print_image_id", "thumbnail", "image")
        return res.send(printProducts)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const printProduct = await PrintProduct.query()
            .findById(id)
            .withGraphFetched("[product_color]")
            .select("id", "title", "product_color_id", "print_image_id", "thumbnail", "image")
        return res.send(printProduct)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByPrintImageId, GetLatest, GetById}
