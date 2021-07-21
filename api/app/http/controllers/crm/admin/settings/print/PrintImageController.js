const {PrintImage} = require("models/print/PrintImage")
const {PrintProduct} = require("models/print/PrintProduct")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

//
const PATH_TO_FOLDER_IMAGES = "../../../public/images/print-images"
const PATH_TO_IMAGE = "images/print-images"

const GetAll = async (req, res) => {
    try {
        const printImages = await PrintImage.query()
            .where({hide_id: null})
            .withGraphFetched("[category]")
            .select("id", "title", "hide_id", "image", "price", "thumbnail")
        return res.send(printImages)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

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

            //
            const [thumbnailPath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${printImageRef.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${printImageRef.id}`,
                fileImage: url_image,
                nameFile: "thumbnail",
                width: 350
            })

            // Обновление картинки
            await PrintImage.query().findById(printImageRef.id).update({
                image: imagePath,
                thumbnail: thumbnailPath
            })
        }

        // Вывод картинки для принтов
        const printImage = await PrintImage.query()
            .findById(printImageRef.id)
            .withGraphFetched("[category]")
            .select("id", "title", "image", "price", "thumbnail")

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

        if (url_image && !url_image.includes("http")) {
            const currentPrintImage = await PrintImage.query().findById(id)
            await ImageService.DeleteImage(currentPrintImage.image)
            await ImageService.DeleteImage(currentPrintImage.thumbnail)

            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath

            //
            const [thumbnailPath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image,
                nameFile: "thumbnail",
                width: 350
            })
            data.thumbnail = thumbnailPath
        }
        await PrintImage.query().updateAndFetchById(id, data)

        const printImage = await PrintImage.query()
            .findById(id)
            .withGraphFetched("[category]")
            .select("id", "title", "price", "image", "thumbnail")

        return res.send(printImage)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Delete = async (req, res) => {
    try {
        const {id} = req.params

        const printImage = await PrintImage.query().findById(id)
        if (!printImage) return res.status(500).send({message: "Ошибка! Картинка не найдена!"})

        const printProducts = await PrintProduct.query().where({print_image_id: id})
        if (printProducts.length)
            return res.status(500).send({message: "Ошибка! Удалите товары связанные с картинкой!"})

        await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)
        await PrintImage.query().deleteById(id)

        return res.send(id)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Edit, Delete, GetAll}
