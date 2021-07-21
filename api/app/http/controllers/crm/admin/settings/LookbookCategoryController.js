const {LookbookCategory} = require("models/settings/LookbookCategory")
const {Lookbook} = require("models/settings/Lookbook")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/lookbook-categories"
const PATH_TO_IMAGE = "images/lookbook-categories"

const GetAll = async (req, res) => {
    try {
        const categories = await LookbookCategory.query().select("id", "title", "image")
        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const Create = async (req, res) => {
    try {
        const {title, url_image} = req.body
        const lookbookCategoryRef = await LookbookCategory.query().insertAndFetch({title})
        //
        const [imagePath] = await ImageService.UploadImage({
            folderPath: `${PATH_TO_FOLDER_IMAGES}/${lookbookCategoryRef.id}`,
            imagePatch: `${PATH_TO_IMAGE}/${lookbookCategoryRef.id}`,
            fileImage: url_image
        })
        //
        const lookbookCategory = await LookbookCategory.query()
            .select("id", "title", "image")
            .updateAndFetchById(lookbookCategoryRef.id, {image: imagePath})
        //
        return res.send(lookbookCategory)
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
    try {
        const {id} = req.params
        const {title, url_image} = req.body
        const data = {title}
        if (!url_image.includes("http")) {
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        const lookbookCategory = await LookbookCategory.query().updateAndFetchById(id, data)
        return res.send(lookbookCategory)
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
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        //
        const lookbook = await Lookbook.query().where({category_id: id})
        if (lookbook.length) return res.status(500).send({message: "Ошибка! Категория не пустая!"})
        //
        await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)
        //
        await LookbookCategory.query().deleteById(id)
        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}
module.exports = {GetAll, Create, Delete, EditById}
