const {PrintCategory} = require("models/print/PrintCategory")
const {PrintImage} = require("models/print/PrintImage")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/print-category"
const PATH_TO_IMAGE = "images/print-category"

/**
 * Создать категорию
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title, category_id, url_image} = req.body
        let categoryRef = await PrintCategory.query().insertAndFetch({
            title: title,
            category_id: category_id
        })
        if (url_image) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${categoryRef.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${categoryRef.id}`,
                fileImage: url_image
            })

            //
            await PrintCategory.query().findById(categoryRef.id).update({
                image: imagePath
            })
        }

        let category = await PrintCategory.query().findById(categoryRef.id).select("id", "title", "image")

        if (category_id)
            category = await PrintCategory.query()
                .withGraphFetched("[sub_categories()]")
                .select("id", "title", "hide_id", "image")
                .findById(category_id)

        return res.send(category)
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
        const {title, url_image, category_id} = req.body
        const data = {title, category_id}
        if (url_image && !url_image.includes("http")) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${id}`,
                imagePatch: `${PATH_TO_IMAGE}/${id}`,
                fileImage: url_image
            })
            data.image = imagePath
            await ImageService.DeleteImagesExceptCurrent(`${PATH_TO_FOLDER_IMAGES}/${id}`, imagePath)
        }
        await PrintCategory.query().updateAndFetchById(id, data)

        const categories = await PrintCategory.query()
            .where({category_id: null})
            .withGraphFetched("[sub_categories()]")
            .select("id", "title", "hide_id", "image")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Удаление категории
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Delete = async (req, res) => {
    try {
        const {id} = req.params
        const pritnCategory = await PrintCategory.query().findById(id)

        if (!pritnCategory.category_id) {
            const printSubCategories = await PrintCategory.query().where({category_id: id})
            if (printSubCategories.length)
                return res
                    .status(500)
                    .send({message: "Ошибка! Удалите все подкатегория для удаления категории!"})
        } else {
            const printImages = await PrintImage.query().where({category_id: id})
            if (printImages.length)
                return res
                    .status(500)
                    .send({message: "Ошибка! Удалите все принты для удаления подкатегории!"})
        }

        if (pritnCategory.image) await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)

        await PrintCategory.query().deleteById(id)

        const categories = await PrintCategory.query()
            .where({category_id: null})
            .withGraphFetched("[sub_categories()]")
            .select("id", "title", "hide_id", "image")

        return res.send(categories)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, Edit, Delete}
