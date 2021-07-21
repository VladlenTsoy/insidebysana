import React, {useState} from "react"
import {message, Upload} from "antd"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons"

interface UploadImagesProps {
    remove: (file: any) => void
    request: (file: any) => Promise<void>
    fileList: any
}

const UploadImages: React.FC<UploadImagesProps> = ({fileList, remove, request}) => {
    const [loading, setLoading] = useState(false)

    // Открыть картинку
    const onPreview = async (file: any) => {
        let src = file.url
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj)
                reader.onload = () => resolve(reader.result)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        if (imgWindow) imgWindow.document.write(image.outerHTML)
    }

    // До загрузки картинки
    const beforeUpload = (file: any) => {
        // Проверка на формат
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
        if (!isJpgOrPng) message.error("Вы можете загружать только файл JPG / PNG!")

        // Проверка размера картинки
        const isLt2M = file.size / 1024 / 1024 < 3
        if (!isLt2M) message.error("Изображение должно быть меньше 3МБ!")

        return isJpgOrPng && isLt2M
    }

    // Загрузка картинка
    const requestHandler = async (e: any) => {
        const form = new FormData()
        form.append("image", e.file)
        setLoading(true)
        await request(form)
        setLoading(false)
    }

    return (
        <Upload
            multiple
            beforeUpload={beforeUpload}
            accept="image/x-png,image/jpeg,image/png"
            className="print-uploader"
            customRequest={requestHandler}
            listType="picture-card"
            fileList={fileList}
            onPreview={onPreview}
            onRemove={remove}
            disabled={loading}
        >
            {loading ? (
                <>
                    <LoadingOutlined style={{marginRight: ".5rem"}} /> Загрузка...
                </>
            ) : (
                <>
                    <PlusOutlined style={{marginRight: ".5rem"}} /> Загрузить
                </>
            )}
        </Upload>
    )
}

export default React.memo(UploadImages)
