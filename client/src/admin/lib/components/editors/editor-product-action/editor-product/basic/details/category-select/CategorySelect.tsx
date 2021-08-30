import React from "react"
import {Form, Select} from "antd"
import {useSelectAllCategories} from "admin/store/common/category/categorySelectors"

const {OptGroup, Option} = Select

const CategorySelect = () => {
    const categories = useSelectAllCategories()
    return (
        <Form.Item
            label="Категория"
            name="category_id"
            rules={[{required: true, message: "Выберите категорию!"}]}
        >
            <Select showSearch optionFilterProp="label" placeholder="Выберите категорию">
                {categories.map(category => (
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

export default CategorySelect
