import React from "react"
import {Select} from "antd"
import {useSelectAllCategories} from "store/common/category/categorySelectors"
import {useCommonDispatch} from "../../../../../../../store/common/store"
import {changeCategoryId} from "../../../../../../../store/admin/product-color/productColorSlice"
import {fetchProductColors} from "../../../../../../../store/admin/product-color/fetchProductColors"

const {OptGroup, Option} = Select

const CategorySelect: React.FC = () => {
    const categories = useSelectAllCategories()
    const dispatch = useCommonDispatch()

    const changeHandler = async (id: number) => {
        await dispatch(changeCategoryId(id))
        await dispatch(fetchProductColors())
    }

    return (
        <Select size="large" className="category-select" defaultValue={0} onChange={changeHandler}>
            <Option value={0} key={0}>
                Все
            </Option>
            {categories.map(category => (
                <OptGroup key={category.id} label={category.title}>
                    {category.sub_categories?.map(sub => (
                        <Option value={sub.id} key={sub.id}>
                            {sub.title}
                        </Option>
                    ))}
                </OptGroup>
            ))}
        </Select>
    )
}

export default CategorySelect
