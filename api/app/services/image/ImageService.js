const Jimp = require("jimp")
const {logger} = require("config/logger.config")
const fs = require("fs")
const path = require("path")
const moment = require("moment")

/**
 * Удаление папки с картинками
 * @param {*} customPath
 */
const DeleteFolder = async customPath => {
    try {
        const fullPath = path.join(__dirname, customPath)
        await fs.rmdirSync(fullPath, {recursive: true})
        // rimraf("/some/directory", function () { console.log("done"); });
    } catch (e) {
        logger.error(e.stack)
    }
}

const MoveFile = async ({oldPath, newPath, folderPath, nameImage}) => {
    // Путь к папке
    const fullFolderPath = path.join(__dirname, folderPath)
    // Создание папки
    if (!fs.existsSync(fullFolderPath)) fs.mkdirSync(fullFolderPath)
    const fullOldPath = path.join(__dirname, oldPath)
    const fullNewPath = path.join(__dirname, newPath)
    await fs.rename(fullOldPath, fullNewPath, () => {})
    return nameImage
}

/**
 * Сохранение изображения
 * @param {*} config
 * @returns
 */
const UploadImage = async ({
    folderPath,
    imagePatch,
    fileImage,
    nameFile = "image",
    width = 1400,
    quality = 75
}) => {
    try {
        // Путь к папке
        const fullFolderPath = path.join(__dirname, folderPath)
        // Создание папки
        if (!fs.existsSync(fullFolderPath)) fs.mkdirSync(fullFolderPath)

        // Картинку в буфер
        const buf =
            typeof fileImage === "string"
                ? Buffer.from(fileImage.replace(/^data:image\/\w+;base64,/, ""), "base64")
                : fileImage.buffer

        // Чтение картинки
        const image = await Jimp.read(buf)
        // Расширение файла
        const ext = image.getExtension()
        // Название файла
        const imageName = `${nameFile}.${moment().valueOf()}.${ext}`
        // Путь к файлу
        const imagePath = `${imagePatch}/${imageName}`

        // Сжатие картинки
        await image.quality(quality)
        // Изменение размера картинки
        if (image.getWidth() > width) await image.resize(width, Jimp.AUTO)
        // Сохранение
        await image.writeAsync(path.join(fullFolderPath, imageName))

        return [imagePath, imageName]
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Удалить все изображения кроме передаваемого изображения
 * @param {*} folderPath
 * @param {*} filePath
 */
const DeleteImagesExceptCurrent = async (folderPath, filePath) => {
    try {
        // Полный путь к папке
        const fullFolderPath = path.join(__dirname, folderPath)
        // Файлы в папке
        const files = await fs.readdirSync(fullFolderPath, {withFileTypes: true})
        await Promise.all(
            await files
                // Проверка на файл
                .filter(file => file.isFile())
                .map(async file => {
                    // Удалить все файлы кроме переданного
                    if (!(filePath && filePath.includes(file.name)))
                        await fs.unlinkSync(path.join(fullFolderPath, file.name))
                })
        )
    } catch (e) {
        logger.error(e.stack)
    }
}

/**
 * Удаление картинки
 * @param {*} filePath
 */
const DeleteImage = async filePath => {
    try {
        // Полный путь к файлу
        const fullFilePath = path.join(__dirname, `../../../public/${filePath}`)
        // Проверка на наличия файла
        if (fs.existsSync(fullFilePath))
            // Удаление файла
            await fs.unlinkSync(fullFilePath)
    } catch (e) {
        logger.error(e.stack)
    }
}

module.exports = {
    MoveFile,
    UploadImage,
    DeleteFolder,
    DeleteImagesExceptCurrent,
    DeleteImage
}
