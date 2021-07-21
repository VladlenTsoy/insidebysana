import React from "react"
import {Select} from "antd"
import {useDispatch} from "../../../store"
import {changeCategoryId} from "../../posSlice"
import {useCategoryIdPos} from "../../posSelectors"
import {useGetCategoriesQuery} from "./categoryApi"

const {OptGroup, Option} = Select

const CategorySelect: React.FC = () => {
    const {data: categories, isLoading} = useGetCategoriesQuery()
    const dispatch = useDispatch()
    const categoryId = useCategoryIdPos()

    const changeHandler = async (id: number) => {
        await dispatch(changeCategoryId(id))
    }

    return (
        <Select
            loading={isLoading}
            size="large"
            className="category-select"
            defaultValue={categoryId}
            onChange={changeHandler}
            listHeight={window.innerHeight - 100}
        >
            <Option value={0} key={0}>
                Все
            </Option>
            {categories &&
                categories.map(category => (
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
