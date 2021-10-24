const {Product} = require("models/products/Product")
const {ProductColor} = require("models/products/ProductColor")
const ProductMeasurementService = require("services/product/ProductMeasurementService")
const ProductTagService = require("services/product/ProductTagService")
const ImageService = require("services/image/ImageService")
const {logger} = require("config/logger.config")
const {ProductHomePosition} = require("models/products/ProductHomePosition")
const {ProductSize} = require("models/products/ProductSize")
const {ProductColorImage} = require("models/products/ProductColorImage")

const PATH_TO_FOLDER_TMP = "../../../public/images/tmp"
const PATH_TO_FOLDER_IMAGES = "../../../public/images/product-colors"
const PATH_TO_IMAGE = "images/product-colors"

const Create = async (req, res) => {
    try {
        const data = req.body
        let productId = data?.product_id
        // Создание продукта
        if (!data.product_id) {
            const productRef = await Product.query().insertAndFetch({
                category_id: data.category_id,
                price: data.price,
                properties: data.properties || []
            })
            productId = productRef.id
        }
        // Найти или создать тег по названию
        const tagsId = await ProductTagService.FindOrCreate(data.tags_id)
        // Создание цвета
        const productColor = await ProductColor.query().insertAndFetch({
            title: data.title,
            product_id: productId,
            color_id: data.color_id,
            thumbnail: null,
            sizes: data.sizes,
            sizes_props: data.props,
            status: data.status,
            tags_id: tagsId,
            is_new: data.is_new
        })
        // Создание размеров
        await Promise.all(
            Object.keys(data.props).map(async key => {
                const values = data.props[key]
                await ProductSize.query().insert({
                    product_color_id: productColor.id,
                    size_id: key,
                    qty: values.qty,
                    min_qty: values.min_qty,
                    cost_price: values.cost_price
                })
            })
        )
        // Сохранение картинок
        if (data.images && data.images.length) {
            const updatedPathToImages = await Promise.all(
                data.images.map(async image => {
                    await ImageService.MoveFile({
                        nameImage: image.name,
                        oldPath: `${PATH_TO_FOLDER_TMP}/${image.name}`,
                        newPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}/${image.name}`,
                        folderPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}`
                    })
                })
            )
            if (updatedPathToImages) {
                await Promise.all(
                    data.images.map(async (image, key) => {
                        if (key === 0) {
                            await ProductColor.query()
                                .findOne({id: productColor.id})
                                .update({
                                    thumbnail: `${PATH_TO_IMAGE}/${productColor.id}/${image.name}`
                                })
                        }
                        await ProductColorImage.query().insert({
                            product_color_id: productColor.id,
                            name: image.name,
                            path: `${PATH_TO_IMAGE}/${productColor.id}/${image.name}`,
                            size: image.size,
                            position: key
                        })
                    })
                )
            }
        }
        // Сохранение или обновление обьемов
        if (data.measurements)
            await ProductMeasurementService.CreateOrUpdate(
                data.measurements,
                productColor.id
            )
        // Позиция на главной странице
        if (data.home_position)
            await ProductHomePosition.query().insert({
                product_color_id: productColor.id,
                position: data.home_position
            })

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const GetById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await ProductColor.query()
            .findById(id)
            .join("products", "products.id", "product_colors.product_id")
            .leftJoin(
                "product_home_positions",
                "product_home_positions.product_color_id",
                "product_colors.id"
            )
            .withGraphFetched(`[measurements, images, colors]`)
            .select(
                "product_colors.id",
                "product_colors.title",
                "product_colors.color_id",
                "product_colors.tags_id",
                "product_colors.status",
                "product_colors.is_new",
                "product_colors.sizes",
                "product_colors.sizes_props as props",
                "products.category_id",
                "products.properties",
                "product_colors.product_id",
                "products.price",
                "product_home_positions.position as home_position"
            )
        return res.send(product)
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

const EditById = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        // Найти или создать тег по названию
        const tagsId = await ProductTagService.FindOrCreate(data.tags_id)
        // Обновление цвета
        const productColor = await ProductColor.query().patchAndFetchById(id, {
            title: data.title,
            color_id: data.color_id,
            thumbnail: null,
            sizes: data.sizes,
            sizes_props: data.props,
            status: data.status,
            tags_id: tagsId,
            is_new: data.is_new
        })
        // Обновление продукта
        await Product.query().patchAndFetchById(productColor.product_id, {
            category_id: data.category_id,
            price: data.price,
            properties: data.properties || []
        })
        // Сохранение картинок
        if (data.images && data.images.length) {
            const updatedPathToImages = await Promise.all(
                data.images.map(async image => {
                    if (!image.isSaved)
                        await ImageService.MoveFile({
                            nameImage: image.name,
                            oldPath: `${PATH_TO_FOLDER_TMP}/${image.name}`,
                            newPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}/${image.name}`,
                            folderPath: `${PATH_TO_FOLDER_IMAGES}/${productColor.id}`
                        })
                })
            )
            if (updatedPathToImages) {
                await Promise.all(
                    data.images.map(async (image, key) => {
                        if (key === 0) {
                            await ProductColor.query()
                                .findById(productColor.id)
                                .update({
                                    thumbnail: `${PATH_TO_IMAGE}/${productColor.id}/${image.name}`
                                })
                        }
                        if (image.isSaved)
                            await ProductColorImage.query()
                                .findById(image.id)
                                .update({position: key})
                        else
                            await ProductColorImage.query().insert({
                                product_color_id: productColor.id,
                                name: image.name,
                                path: `${PATH_TO_IMAGE}/${productColor.id}/${image.name}`,
                                size: image.size,
                                position: key
                            })
                    })
                )
            }
        }
        // Сохранение или обновление обьемов
        if (data.measurements)
            await ProductMeasurementService.CreateOrUpdate(
                data.measurements,
                productColor.id
            )
        // Позиция на главной странице
        if (data.home_position)
            await ProductHomePosition.query()
                .findOne({product_color_id: productColor.id})
                .update({
                    position: data.home_position
                })
        else
            await ProductHomePosition.query()
                .findOne({product_color_id: productColor.id})
                .delete()

        return res.send({status: "success"})
    } catch (e) {
        logger.error(e.stack)
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Create, GetById, EditById}
