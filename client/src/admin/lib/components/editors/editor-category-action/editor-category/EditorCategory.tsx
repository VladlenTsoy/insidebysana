import React from "react"
import {Form, Input, Select} from "antd"
import {useSelectAllCategories} from "admin/store/common/category/categorySelectors"
import {useAdminDispatch} from "../../../../../store"
import {createCategory} from "../../../../../store/admin/category/createCategory"
import {SubCategory} from "../../../../types/Category"
import {editCategory} from "../../../../../store/admin/category/editCategory"
// @ts-ignore
import transliterate from "transliterate-cyrillic-text-to-latin-url"
import {useForm} from "antd/es/form/Form"

const {Option} = Select

interface EditorCategoryProps {
    sub?: boolean
    category?: SubCategory
    setLoading: any
    close: any
}

const EditorCategory: React.FC<EditorCategoryProps> = ({sub, setLoading, close, category}) => {
    const categories = useSelectAllCategories()
    const dispatch = useAdminDispatch()
    const [form] = useForm()

    const onChangeTitleHandler = (e: any) => {
        if (e.currentTarget.value) form.setFieldsValue({url: transliterate(e.currentTarget.value)})
    }

    const onFinish = async (values: any) => {
        setLoading(true)
        if (category) await dispatch(editCategory({id: category.id, data: values}))
        else await dispatch(createCategory(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            initialValues={category}
            form={form}
            layout="vertical"
            id="editor-category"
            size="large"
            onFinish={onFinish}
        >
            {sub && (
                <Form.Item
                    name="category_id"
                    label="Категорию"
                    rules={[{required: true, message: "Выберите категорию!"}]}
                >
                    <Select>
                        {categories.map(category => (
                            <Option value={category.id} key={category.id}>
                                {category.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input onChange={onChangeTitleHandler} />
            </Form.Item>
            <Form.Item
                name="url"
                label="URL"
                rules={[
                    {
                        required: true,
                        message: "Введите url!"
                    }
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorCategory
