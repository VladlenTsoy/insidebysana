import React from "react"
import {Form, Select} from "antd"
import {Color} from "admin/lib/types/Color"
import "./SelectColor.less"
import {useGetAllColorsQuery} from "./colorApi"

const {Option} = Select

interface SelectColorProps {
    onSelectColorHandler: (colorId: Color["id"]) => void
}

const SelectColor: React.FC<SelectColorProps> = ({onSelectColorHandler}) => {
    const {isLoading, data: colors} = useGetAllColorsQuery()

    return (
        <Form.Item label="Цвет" name="color_id" rules={[{required: true, message: "Выберите цвет"}]}>
            <Select
                showSearch
                loading={isLoading}
                // optionFilterProp="label"
                placeholder="Выберите цвет"
                // optionFilterProp="children"
                onSelect={onSelectColorHandler}
                filterOption={(input: any, option: any) =>
                    option["data-title"].toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {colors &&
                    colors.map(color => (
                        <Option value={color.id} data-title={color.title} key={color.id}>
                            <div className="option-color">
                                <div className="color" style={{background: color.hex}} />
                                {color.title}
                            </div>
                        </Option>
                    ))}
            </Select>
        </Form.Item>
    )
}

export default SelectColor
