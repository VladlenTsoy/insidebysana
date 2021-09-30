const {logger} = require("config/logger.config")
const ImageService = require("services/image/ImageService")

const PATH_TO_FOLDER_IMAGES = "../../../public/images/tmp"
const PATH_TO_IMAGE = "images/tmp"

const Upload = async (req, res) => {
    try {
        const {image, time} = req.body
        const [imagePath] = await ImageService.UploadImage({
            folderPath: `${PATH_TO_FOLDER_IMAGES}/${time}`,
            imagePatch: `${PATH_TO_IMAGE}/${time}`,
            fileImage: image,
            nameFile: time
        })
        return res.send({
            loading: false,
            imageUrl: `${process.env.APP_URL}/${imagePath}`,
            imagePath,
            id: time,
            time
        })
    } catch (e) {
        logger.error(e.stack)
        xw
        return res.status(500).send({message: e.message})
    }
}

module.exports = {Upload}
