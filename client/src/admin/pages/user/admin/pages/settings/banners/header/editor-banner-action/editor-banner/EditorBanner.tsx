import React from "react"
import {Input, Form} from "antd"
import {useAdminDispatch} from "../../../../../../../../../store"
import {useForm} from "antd/es/form/Form"
import InputImage from "../../../../../../../../../lib/components/form/input-image/InputImage"
import {createBanner} from "../../../../../../../../../store/admin/banner/createBanner"
import {Banner} from "../../../../../../../../../lib/types/Banner"
import {editBanner} from "../../../../../../../../../store/admin/banner/editBanner"

interface EditorSourceProps {
    setLoading: any
    close: any
    banner?: Banner
}

const EditorBanner: React.FC<EditorSourceProps> = ({setLoading, close, banner}) => {
    const [form] = useForm()
    const dispatch = useAdminDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (banner) await dispatch(editBanner({id: banner.id, data: values}))
        else await dispatch(createBanner(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-banner"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={banner}
        >
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item
                name="button_title"
                label="Название Кнопки"
                rules={[{required: true, message: "Введите название кнопки!"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="button_link"
                label="Ссылку Кнопки"
                rules={[{required: true, message: "Введите ссылку кнопки!"}]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorBanner
