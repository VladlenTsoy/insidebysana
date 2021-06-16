import React from "react"
import {Form, Input, Select} from "antd"
import {useAdminDispatch} from "../../../../../store/admin/store"
import {SubCategory} from "../../../../types/Category"
import {useForm} from "antd/es/form/Form"
import {editPrintCategory} from "store/admin/print-category/editPrintCategory"
import {createPrintCategory} from "store/admin/print-category/createPrintCategory"
import {useSelectAllPrintCategories} from "store/admin/print-category/printCategorySelectors"

const {Option} = Select

interface EditorCategoryProps {
    sub?: boolean
    category?: SubCategory
    setLoading: any
    close: any
}

const EditorPrintCategory: React.FC<EditorCategoryProps> = ({sub, setLoading, close, category}) => {
    const categories = useSelectAllPrintCategories()
    const dispatch = useAdminDispatch()
    const [form] = useForm()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (category) await dispatch(editPrintCategory({id: category.id, data: values}))
        else await dispatch(createPrintCategory(values))
        setLoading(false)
        close()
    }

    return (
        <Form
            initialValues={category}
            form={form}
            layout="vertical"
            id="editor-print-category"
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
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorPrintCategory
