import React, {useEffect, useState} from "react"
import "./InputImage.less"
import {Form, FormInstance, message} from "antd"
import {Rule} from "rc-field-form/lib/interface"
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import {getBase64} from "utils/getBase64"

interface InputImageProps {
    accept?: string
    name: string
    form: FormInstance
    rules?: Rule[]
}

const InputImage: React.FC<InputImageProps> = ({
    name,
    form,
    rules,
    accept = "image/x-png,image/jpeg,image/png"
}) => {
    const [image, setImage] = useState<any>(form.getFieldValue(name) || null)

    const addInputChangeHandler = (e: any) => {
        if (e.target.files.length) {
            // Get this url from response in real world.
            return Object.values(e.target.files).map((file: any) => {
                if (accept.includes(file.type))
                    getBase64(file, (imageUrl: any) => {
                        setImage(imageUrl)
                    })
                else message.error("Данный формат изображения не поддерживается!")
                return null
            })
        } else setImage(null)
    }

    useEffect(() => {
        form.setFieldsValue({[name]: image})
    }, [image, form, name])

    return (
        <Form.Item name={name} rules={rules}>
            <div className="input-image">
                {image ? (
                    <label className="output-image">
                        <img src={image} alt="" />
                        <input type="file" onChange={addInputChangeHandler} accept={accept} />
                        <div className="edit-image">
                            <EditOutlined />
                        </div>
                    </label>
                ) : (
                    <label className="input-image-add">
                        <PlusOutlined />
                        <input type="file" onChange={addInputChangeHandler} accept={accept} />
                    </label>
                )}
            </div>
        </Form.Item>
    )
}

export default InputImage
