import {Select} from "antd"
import React from "react"
import {useCategoryIdPos} from "../../posSelectors"
import {changeSizeId} from "../../posSlice"
import {useGetSizeQuery} from "./sizeApi"
import {useDispatch} from "../../../store"

const {Option} = Select

const SizeSelect: React.FC = () => {
    const {data: sizes, isLoading} = useGetSizeQuery()
    const dispatch = useDispatch()
    const categoryId = useCategoryIdPos()

    const changeHandler = async (id: number) => {
        await dispatch(changeSizeId(id))
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
            {sizes &&
                sizes.map(size => (
                    <Option value={size.id} key={size.id}>
                        {size.title}
                    </Option>
                ))}
        </Select>
    )
}
export default SizeSelect
