const {PrintProduct} = require("models/print/PrintProduct")
const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/print-products"
const PATH_TO_IMAGE = "images/print-products"

/**
 * Вывод всех товаров
 * @param {*} req
 * @param {*} res
 * @returns
 */
const GetByPrintImageId = async (req, res) => {
    try {
        const {print_image_id} = req.params
        const products = await PrintProduct.query()
            .where({print_image_id: print_image_id})
            .withGraphFetched("[product_color]")
            .select("id", "title", "product_color_id", "print_image_id", "thumbnail", "image")
        return res.send(products)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

/**
 * Создать принт-продукт
 * @param req
 * @param res
 * @return {Promise<*>}
 * @constructor
 */
const Create = async (req, res) => {
    try {
        const {title, product_color_id, print_image_id, url_image} = req.body
        let productRef = await PrintProduct.query().insertAndFetch({
            title,
            product_color_id,
            print_image_id
        })
        if (url_image) {
            // Загрузка картинки
            const [imagePath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${productRef.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${productRef.id}`,
                fileImage: url_image
            })

            const [thumbnailPath] = await ImageService.UploadImage({
                folderPath: `${PATH_TO_FOLDER_IMAGES}/${productRef.id}`,
                imagePatch: `${PATH_TO_IMAGE}/${productRef.id}`,
                fileImage: url_image,
                nameFile: "thumbnail",
                width: 350
            })

            //
            await PrintProduct.query().findById(productRef.id).update({
                image: imagePath,
                thumbnail: thumbnailPath
            })
        }

        const product = await PrintProduct.query()
            .findById(productRef.id)
            .withGraphFetched("[product_color]")
            .select("id", "title", "product_color_id", "print_image_id", "thumbnail", "image")

        return res.send(product)
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
        const {title, url_image, product_color_id, print_image_id} = req.body
        const data = {title, product_color_id, print_image_id}

        if (!url_image.includes("http")) {
            //
            const currentPrintProduct = await PrintProduct.query().findById(id)
            await ImageService.DeleteImage(currentPrintProduct.image)
            await ImageService.DeleteImage(currentPrintProduct.thumbnail)

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
        //
        await PrintProduct.query().updateAndFetchById(id, data)
        //
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

const Delete = async (req, res) => {
    try {
        const {id} = req.params
        await ImageService.DeleteFolder(`${PATH_TO_FOLDER_IMAGES}/${id}`)
        await PrintProduct.query().deleteById(id)
        return res.send(id)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, GetByPrintImageId, Edit, Delete}
