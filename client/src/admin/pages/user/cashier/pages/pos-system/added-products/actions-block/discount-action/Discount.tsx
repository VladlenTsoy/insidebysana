import {DollarOutlined, PercentageOutlined} from "@ant-design/icons"
import {InputNumber, Radio, Form} from "antd"
import React from "react"
import {setDiscount} from "admin/store/cashier/pos/posSlice"
import {useCashierDispatch} from "admin/store/cashier/store"
import {useDiscountPos} from "admin/store/cashier/pos/posSelectors"
import "./Discount.less"
import {formatPrice} from "admin/utils/formatPrice"
import {useState} from "react"

interface DiscountProps {
    close: any
}

const Discount: React.FC<DiscountProps> = ({close}) => {
    const dispatch = useCashierDispatch()
    const discount = useDiscountPos()
    const [typeDiscount, setTypeDiscound] = useState<string>(discount ? discount.type : "fixed")

    const onChangeHandler = (e: any) => setTypeDiscound(e.target.value)

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
                    <Radio.Group buttonStyle="solid" className="discount-type" onChange={onChangeHandler}>
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
                        {...(typeDiscount === "fixed" ? {formatter: val => formatPrice(Number(val))} : {})}
                    />
                </Form.Item>
            </Form>
        </>
    )
}
export default Discount
