import React, {useEffect, useState} from "react"
import "./InputImages.less"
import {Form, FormInstance} from "antd"
import {PlusOutlined, CloseOutlined} from "@ant-design/icons"
import {Rule} from "rc-field-form/lib/interface"

interface InputImageProps {
    form: FormInstance
    name: string
    multiple?: boolean
    rules?: Rule[]
}

const InputImages: React.FC<InputImageProps> = ({form, rules, name, multiple}) => {
    const [images, setImages] = useState<any[]>(form.getFieldValue(name) || [])

    const addInputChangeHandler = (e: any) => {
        if (e.target.files.length) {
            setImages(prevState => [...prevState, e.target.files])
        }
    }

    const removePhotoHandler = (key: number) =>
        setImages(prevState => prevState.filter((img, index) => index !== key))

    useEffect(() => {
        form.setFieldsValue({[name]: images})
    }, [images, form, name])

    return (
        <Form.Item name={name} rules={rules}>
            <div className="add-color-photos">
                {images.map((img, key) => (
                    <div className="photo-output" key={key}>
                        <div className="btn-icon" onClick={() => removePhotoHandler(key)}>
                            <CloseOutlined />
                        </div>
                        <img src={img} alt="" />
                    </div>
                ))}
                <label className="add-photo">
                    <PlusOutlined />
                    <input type="file" multiple={multiple} onChange={addInputChangeHandler} />
                </label>
            </div>
        </Form.Item>
    )
}

export default InputImages
