import React from "react"
import {Form, Input} from "antd"
import {useForm} from "antd/es/form/Form"
import {useAdminDispatch} from "../../../../store"
import {LookbookCategory} from "../../../types/Lookbook"
import InputImage from "../../form/input-image/InputImage"
import {createLookbookCategory} from "admin/store/admin/lookbook/createLookbookCategory"
import {editLookbookCategory} from "admin/store/admin/lookbook/editLookbookCategory"

interface EditorLookbookCategoryProps {
    setLoading: any
    close: any
    lookbookCategory?: LookbookCategory
}

const EditorLookbookCategory: React.FC<EditorLookbookCategoryProps> = ({
    setLoading,
    close,
    lookbookCategory
}) => {
    const [form] = useForm()
    const dispatch = useAdminDispatch()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (lookbookCategory) await dispatch(editLookbookCategory({id: lookbookCategory.id, data: values}))
        else await dispatch(createLookbookCategory(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-lookbook-category"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={lookbookCategory}
        >
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
        </Form>
    )
}

export default EditorLookbookCategory
