import {Select} from "antd"
import React from "react"
import {useCategoryIdPos} from "admin/store/cashier/pos/posSelectors"
import {changeSizeId} from "admin/store/cashier/pos/posSlice"
import {useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import {useCommonDispatch} from "admin/store/common/store"

const {Option} = Select

const SizeSelect: React.FC = () => {
    const sizes = useSelectAllSizes()
    const dispatch = useCommonDispatch()
    const categoryId = useCategoryIdPos()

    const changeHandler = async (id: number) => {
        await dispatch(changeSizeId(id))
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
            {sizes.map(size => (
                <Option value={size.id} key={size.id}>
                    {size.title}
                </Option>
            ))}
        </Select>
    )
}
export default SizeSelect
