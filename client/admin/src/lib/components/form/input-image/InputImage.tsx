import React, {useEffect, useState} from "react"
import "./InputImage.less"
import {Form, FormInstance} from "antd"
import {Rule} from "rc-field-form/lib/interface"
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import {getBase64} from "../../../../utils/getBase64"

interface InputImageProps {
    name: string
    form: FormInstance
    rules?: Rule[]
}

const InputImage: React.FC<InputImageProps> = ({name, form, rules}) => {
    const [image, setImage] = useState<any>(form.getFieldValue(name) || null)

    const addInputChangeHandler = (e: any) => {
        if (e.target.files.length) {
            // Get this url from response in real world.
            return Object.values(e.target.files).map((file: any) =>
                getBase64(file, (imageUrl: any) => {
                    setImage(imageUrl)
                })
            )
        }
        else setImage(null)
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
                        <input type="file" onChange={addInputChangeHandler} />
                        <div className="edit-image">
                            <EditOutlined />
                        </div>
                    </label>
                ) : (
                    <label className="input-image-add">
                        <PlusOutlined />
                        <input type="file" onChange={addInputChangeHandler} />
                    </label>
                )}
            </div>
        </Form.Item>
    )
}

export default InputImage
