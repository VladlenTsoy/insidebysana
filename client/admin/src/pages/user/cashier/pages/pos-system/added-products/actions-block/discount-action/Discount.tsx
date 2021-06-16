import {DollarOutlined, PercentageOutlined} from "@ant-design/icons"
import {InputNumber, Radio, Form} from "antd"
import React from "react"
import {setDiscount} from "store/cashier/pos/posSlice"
import {useCashierDispatch} from "store/cashier/store"
import {useDiscountPos} from "store/cashier/pos/posSelectors"
import "./Discount.less"
import {formatPrice} from "utils/formatPrice"

interface DiscountProps {
    close: any
}

const Discount: React.FC<DiscountProps> = ({close}) => {
    const dispatch = useCashierDispatch()
    const discount = useDiscountPos()

    const onFinishHandler = (values: any) => {
        dispatch(setDiscount(values))
        close()
    }

    return (
        <>
            <Form
                size="large"
                layout="vertical"
                id="pos-add-discount"
                onFinish={onFinishHandler}
                initialValues={discount || {type: "fixed", discount: 0}}
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
                    <InputNumber
                        className="discount-value"
                        min={0}
                        formatter={val => formatPrice(Number(val))}
                    />
                </Form.Item>
            </Form>
        </>
    )
}
export default Discount
