import {useAdminDispatch} from "admin/store"
import {fetchSizes} from "admin/store/common/size/fetchSizes"
import {useLoadingSizes, useSelectAllSizes} from "admin/store/common/size/sizeSelectors"
import {Form, Select} from "antd"
import React, {useEffect} from "react"

const {Option} = Select

interface SizesSelectProps {
    onSelectSizesHandler: (sizeIds: any[]) => void
}

const SizesSelect: React.FC<SizesSelectProps> = ({onSelectSizesHandler}) => {
    const sizes = useSelectAllSizes()
    const loading = useLoadingSizes()
    const dispatch = useAdminDispatch()

    const filterOptionHandler = (inputValue: any, option: any) => {
        return option?.label.search(new RegExp(inputValue, "i")) >= 0
    }

    useEffect(() => {
        const promise = dispatch(fetchSizes())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <Form.Item label="Размеры" name="sizes" rules={[{required: true, message: "Выберите размер!"}]}>
            <Select
                onChange={onSelectSizesHandler}
                mode="multiple"
                loading={loading}
                style={{width: "100%"}}
                placeholder="Добавить размер"
                filterOption={filterOptionHandler}
            >
                {sizes.map(size => (
                    <Option value={String(size.id)} key={`tag-${size.id}`} label={size.title}>
                        {size.title}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}
export default SizesSelect
