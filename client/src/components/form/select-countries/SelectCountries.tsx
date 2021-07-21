import {Form, Select} from "antd"
import React from "react"

interface SelectCountriesProps {
    onChange?: any
}

const SelectCountries: React.FC<SelectCountriesProps> = ({onChange}) => {
    return (
        <Form.Item name="country" label="Страна" rules={[{required: true, message: "Выберите страну!"}]}>
            <Select placeholder="Выберите страну" onChange={onChange}>
                <Select.Option value="uz">Узбекистан</Select.Option>
                <Select.Option value="kz">Казахстан</Select.Option>
                <Select.Option value="ru">Россия</Select.Option>
            </Select>
        </Form.Item>
    )
}
export default SelectCountries
