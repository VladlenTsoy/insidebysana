const {Banner} = require("models/settings/Banner")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")
const {body, validationResult} = require("express-validator")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/banners"
const PATH_TO_IMAGE = "images/banners"

/**
 * Вывод всех баннеров
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const banners = await Banner.query().select("id", "title", "image", "button_link", "button_title")
        return res.send(banners)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const CreateValidate = [
    body("title").not().isEmpty().withMessage("Введите название!"),
    body("url_image").not().isEmpty().withMessage("Выберите картинку!"),
    body("button_link").not().isEmpty().withMessage("Введите ссылку!"),
    body("button_title").not().isEmpty().withMessage("Выберите название кнопки!")
]

/**
 * Создание баннера
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        const {title, url_image, button_link, button_title} = req.body
        const bannerRef = await Banner.query().insertAndFetch({title, button_link, button_title})
        const [imagePath] = await ImageService.UploadImage({
            folderPath: `${PATH_TO_FOLDER_IMAGES}/${bannerRef.id}`,
            imagePatch: `${PATH_TO_IMAGE}/${bannerRef.id}`,
            fileImage: url_image
        })
        const banner = await Banner.query()
            .select("id", "title", "image", "button_link", "button_title")
            .updateAndFetchById(bannerRef.id, {image: imagePath})
        return res.send(banner)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Редактирование
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const EditById = async (req, res) => {
    // Ошибка валидации
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

    try {
        const {id} = req.params
        const {title, url_image, button_link, button_title} = req.body
        const data = {title, button_link, button_title}
        if (!url_image.includes("http")) {
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        const banner = await Banner.query().updateAndFetchById(id, data)
        return res.send(banner)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const DeleteById = async (req, res) => {
    try {
        const {id} = req.params
        await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)
        await Banner.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create, CreateValidate, EditById, DeleteById}
