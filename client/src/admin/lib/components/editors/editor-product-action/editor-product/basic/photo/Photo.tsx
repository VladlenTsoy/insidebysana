import React, {useState} from "react"
import {Form} from "antd"
import "./Photo.less"
import {FormInstance} from "antd/es/form"
import {getBase64} from "admin/utils/getBase64"
import {FileImageOutlined} from "@ant-design/icons"

interface PhotoProps {
    form: FormInstance
}

const Photo: React.FC<PhotoProps> = ({form}) => {
    const [imageUrl, setImageUrl] = useState()

    const handleChange = (e: any) => {
        if (e.target.files.length) {
            // Get this url from response in real world.
            return getBase64(e.target.files[0], (imageUrl: any) => {
                setImageUrl(imageUrl)
                form.setFieldsValue({url_image: imageUrl})
            })
        } else
            setImageUrl(undefined)
    }

    return (
        <Form.Item name="url_image" rules={[{required: true, message: "Выберите картинку!"}]}>
            <label className="product-photo">
                {(imageUrl || form.getFieldValue("url_image")) && (
                    <div className="photo-output">
                        <img src={imageUrl || form.getFieldValue("url_image")} alt="Изменить фотографию" />
                    </div>
                )}
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} hidden />
                {!(imageUrl || form.getFieldValue("url_image")) && (
                    <div className="select-image">
                        <FileImageOutlined />
                        <span>Выберите картинку</span>
                    </div>
                )}
            </label>
        </Form.Item>
    )
}

export default Photo
