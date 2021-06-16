import {DollarOutlined, PercentageOutlined} from "@ant-design/icons"
import {Form, Radio, InputNumber} from "antd"
import {OrderDiscount} from "lib/types/Order"
import React from "react"
import {formatPrice} from "utils/formatPrice"

interface FormDiscountProps {
    selectDiscount: OrderDiscount | null
    onFinishHandler: (values: OrderDiscount) => void
}

const FormDiscount: React.FC<FormDiscountProps> = ({selectDiscount, onFinishHandler}) => {
    return (
        <Form
            size="large"
            layout="vertical"
            id="form-add-discount-block"
            onFinish={onFinishHandler}
            initialValues={selectDiscount || {type: "fixed", discount: 0}}
        >
            <Form.Item name="type">
                <Radio.Group buttonStyle="solid" className="discount-type">
                    <Radio.Button value="fixed">
                        <DollarOutlined /> Фиксированная
                    </Radio.Button>
                    <Radio.Button value="percent">
                        <PercentageOutlined /> В процентах
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Скидка" name="discount">
                <InputNumber className="discount-value" min={0} formatter={val => formatPrice(Number(val))} />
            </Form.Item>
        </Form>
    )
}
export default FormDiscount
