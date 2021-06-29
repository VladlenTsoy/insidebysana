const {PrintImage} = require("models/print/PrintImage")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

//
const PATH_TO_FOLDER_IMAGES = "../../../public/images/print-images"
const PATH_TO_IMAGE = "images/print-images"

/**
 * Добавить картинку для принта
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title, price, category_id, url_image} = req.body
        const printImageRef = await PrintImage.query().insertAndFetch({
            title,
            price,
            category_id
        })
        if (url_image) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${printImageRef.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${printImageRef.id}`,
                fileImage: url_image
            })

            // Обновление картинки
            await PrintImage.query().findById(printImageRef.id).update({
                image: imagePath
            })
        }

        // Вывод картинки для принтов
        const printImage = await PrintImage.query()
            .findById(printImageRef.id)
            .withGraphFetched("[category]")
            .select("id", "title", "image", "price")

        return res.send(printImage)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактировать категорию
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const {title, url_image, category_id, price} = req.body
        const data = {title, category_id, price}
        if (!url_image.includes("http")) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        await PrintImage.query().updateAndFetchById(id, data)

        const printImage = await PrintImage.query()
            .findById(id)
            .withGraphFetched("[category]")
            .select("id", "title", "price", "image")

        return res.send(printImage)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Edit}
