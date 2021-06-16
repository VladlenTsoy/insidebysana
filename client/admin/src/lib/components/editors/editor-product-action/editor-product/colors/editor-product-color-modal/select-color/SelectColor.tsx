import React from "react"
import {Form, Select} from "antd"
import {useSelectAllColors} from "store/admin/color/colorSelectors"
import {Color} from "lib/types/Color"

const {Option} = Select

interface SelectColorProps {
    onSelectColorHandler: (colorId: Color["id"]) => void
}

const SelectColor: React.FC<SelectColorProps> = ({onSelectColorHandler}) => {
    const colors = useSelectAllColors()

    return (
        <Form.Item name="color_id" rules={[{required: true, message: "Выберите цвет"}]}>
            <Select
                showSearch
                size="large"
                style={{width: "100%"}}
                placeholder="Выберите цвет"
                optionFilterProp="children"
                onSelect={onSelectColorHandler}
                filterOption={(input: any, option: any) =>
                    option["data-title"].toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {colors.map(color => (
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
