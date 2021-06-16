const {ProductColorPrint} = require("models/products/ProductColorPrint")
const ImageService = require("services/image/ImageService")
const {logger} = require("config/logger.config")

/**
 * Вывод картинок для принтов по Color Id
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetByProductColorId = async (req, res) => {
    try {
        const {productColorId} = req.params
        const prints = await ProductColorPrint.query().where({product_color_id: productColorId})
        return res.send(prints)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Загрузка картинок для принтов
 * @param req
 * @param res
 * @return {Promise<void>}
 * @constructor
 */
const Upload = async (req, res) => {
    try {
        const {productColorId} = req.params
        const file = req.file
        const printRef = await ProductColorPrint.query().insert({product_color_id: productColorId})
        // const image = await ImageService.ProductColorPrintImageUpload(productColorId, file, printRef.id)
        const print = await ProductColorPrint.query().updateAndFetchById(printRef.id, {image})
        return res.send(print)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление картинки для печати
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const print = await ProductColorPrint.query().findById(id)
        if (print) {
            await ImageService.DeleteImage(print.image)
            await ProductColorPrint.query().deleteById(id)
        }
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetByProductColorId, Upload, Delete}
