import React from "react"
import {Form, Input, Select} from "antd"
import {useForm} from "antd/es/form/Form"
import {useAdminDispatch} from "../../../../../store"
import {Lookbook} from "../../../../types/Lookbook"
import InputImage from "../../../form/input-image/InputImage"
import {createLookbook} from "../../../../../store/admin/lookbook/createLookbook"
import {editLookbook} from "../../../../../store/admin/lookbook/editLookbook"
import {
    useLoadingLookbookCategory,
    useSelectAllLookbookCategories
} from "admin/store/admin/lookbook/lookbookSelectors"

interface EditorLookbookProps {
    setLoading: any
    close: any
    lookbook?: Lookbook
}

const EditorLookbook: React.FC<EditorLookbookProps> = ({setLoading, close, lookbook}) => {
    const [form] = useForm()
    const dispatch = useAdminDispatch()
    const lookbookCategories = useSelectAllLookbookCategories()
    const loading = useLoadingLookbookCategory()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (lookbook) await dispatch(editLookbook({id: lookbook.id, data: values}))
        else await dispatch(createLookbook(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-lookbook"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={lookbook}
        >
            <Form.Item
                name="category_id"
                label="Категория"
                rules={[{required: true, message: "Выберите категорию!"}]}
            >
                <Select loading={loading}>
                    {lookbookCategories.map(category => (
                        <Select.Option value={category.id} key={category.id}>
                            {category.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item
                name="position"
                label="Позиция"
                rules={[{required: true, message: "Введите позицию!"}]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorLookbook
