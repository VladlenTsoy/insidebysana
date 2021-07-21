import React from "react"
import {Select} from "antd"
import {useSelectAllCategories} from "admin/store/common/category/categorySelectors"
import {useCommonDispatch} from "../../../../../../../store/common/store"
import {changeCategoryId} from "admin/store/cashier/pos/posSlice"
import {useCategoryIdPos} from "admin/store/cashier/pos/posSelectors"

const {OptGroup, Option} = Select

const CategorySelect: React.FC = () => {
    const categories = useSelectAllCategories()
    const dispatch = useCommonDispatch()
    const categoryId = useCategoryIdPos()

    const changeHandler = async (id: number) => {
        await dispatch(changeCategoryId(id))
    }

    return (
        <Select
            size="large"
            className="category-select"
            defaultValue={categoryId}
            onChange={changeHandler}
            listHeight={window.innerHeight - 100}
        >
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
