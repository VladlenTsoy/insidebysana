const {AdditionalService} = require("models/settings/AdditionalService")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/additional-services"
const PATH_TO_IMAGE = "images/additional-services"

/**
 * Вывод всех доп. услуг
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const additionalServices = await AdditionalService.query()
        return res.send(additionalServices)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод всех доп. услуг
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title, price, display, url_image} = req.body
        // Создать доп. услугу
        let additionalService = await AdditionalService.query().insertAndFetch({
            title,
            price,
            display: display ? display : []
        })
        // Проверка картинки
        if (url_image) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${additionalService.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${additionalService.id}`,
                fileImage: url_image,
                width: 500
            })
            // Обновить вывод
            additionalService = await AdditionalService.query().updateAndFetchById(additionalService.id, {
                image: imagePath
            })
        }

        return res.send(additionalService)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Вывод всех доп. услуг
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Edit = async (req, res) => {
    try {
        const {id} = req.params
        const data = ({title, price, display, url_image} = req.body)
        //
        if (url_image && !url_image.includes("http")) {
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image,
                width: 500
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        //
        const additionalService = await AdditionalService.query().updateAndFetchById(id, {
            ...data,
            display: display ? display : []
        })
        return res.send(additionalService)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление
 * @param {*} req
 * @param {*} res
 * @returns
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)
        await AdditionalService.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create, Edit, Delete}
