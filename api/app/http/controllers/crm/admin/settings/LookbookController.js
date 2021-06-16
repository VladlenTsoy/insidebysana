const {logger} = require("config/logger.config")
const {Lookbook} = require("models/settings/Lookbook")
const ImageService = require("services/image/ImageService")
const {body, validationResult} = require("express-validator")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/lookbook"
const PATH_TO_IMAGE = "images/lookbook"

/**
 * Вывод всех lookbook
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetAll = async (req, res) => {
    try {
        const lookbook = await Lookbook.query()

        return res.send(lookbook)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const CreateValidate = [
    body("url_image").not().isEmpty().withMessage("Выберите картинку!"),
    body("position").not().isEmpty().withMessage("Выберите позицию!")
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
        const {position, url_image} = req.body
        const LookbookRef = await Lookbook.query().insertAndFetch({position})
        const [imagePath] = await ImageService.UploadImage({
            folderPath: `${PATH_TO_FOLDER_IMAGES}/${LookbookRef.id}`,
            imagePatch: `${PATH_TO_IMAGE}/${LookbookRef.id}`,
            fileImage: url_image
        })
        const lookbook = await Lookbook.query()
            .select("id", "position", "image")
            .updateAndFetchById(LookbookRef.id, {image: imagePath})
        return res.send(lookbook)
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
        const {position, url_image} = req.body
        const data = {position}
        if (!url_image.includes("http")) {
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        const lookbook = await Lookbook.query().updateAndFetchById(id, data)
        return res.send(lookbook)
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
        await Lookbook.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {GetAll, Create, CreateValidate, EditById, DeleteById}
