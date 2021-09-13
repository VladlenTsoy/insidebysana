import React from "react"
import {Form, Select} from "antd"
import {useGetAllCategoriesQuery} from "./categoryApi"

const {OptGroup, Option} = Select

const CategoryFormSelect: React.FC = () => {
    const {isLoading, data: categories} = useGetAllCategoriesQuery()

    return (
        <Form.Item
            label="Категория"
            name="category_id"
            rules={[{required: true, message: "Выберите категорию!"}]}
        >
            <Select showSearch loading={isLoading} optionFilterProp="label" placeholder="Выберите категорию">
                {categories &&
                    categories.map(category => (
                        <OptGroup key={category.id} label={category.title}>
                            {category.sub_categories?.map(sub => (
                                <Option label={sub.title} value={sub.id} key={sub.id} data-title={sub.title}>
                                    {sub.title}
                                </Option>
                            ))}
                        </OptGroup>
                    ))}
            </Select>
        </Form.Item>
    )
}
export default CategoryFormSelect
