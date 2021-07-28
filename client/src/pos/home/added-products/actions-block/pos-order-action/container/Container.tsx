import {Button, Form, InputNumber} from "antd"
import React from "react"
import {useButtonSubmit} from "../../../../posSelectors"
import {useLeftToPay, usePayments} from "pos/features/cart/cartSlice"
import {changePriceToPayment} from "pos/features/cart/cartSlice"
import {useDispatch} from "../../../../../store"
import {formatPrice} from "utils/formatPrice"
import {PosOrderPayment} from "../PosOrderPayment"
import ClientAction from "./client-action/ClientAction"
import LeftToPayBlock from "./left-to-pay-block/LeftToPayBlock"
import PayChangeBlock from "./pay-change-block/PayChangeBlock"
import PaymentBlock from "./payments-block/PaymentBlock"
import ProcessingBlock from "./processing-block/ProcessingBlock"

interface ContainerProps {
    selectClient: any
    updateSelectClient: any
    onFinishHandler: any
}

const Container: React.FC<ContainerProps> = ({selectClient, updateSelectClient, onFinishHandler}) => {
    const payments = usePayments()
    const dispatch = useDispatch()
    const leftToPay = useLeftToPay()
    const {disabled, loading} = useButtonSubmit()

    const onChangePaymentHandler = (payment: PosOrderPayment) => dispatch(changePriceToPayment(payment))

    return (
        <div className="container">
            <PaymentBlock />
            <div className="content">
                <div className="inputs">
                    <ClientAction selectClient={selectClient} updateSelectClient={updateSelectClient} />
                    <Form
                        labelCol={{span: 6}}
                        size="large"
                        id="pos-create-order"
                        className="pos-create-order"
                        onFinish={onFinishHandler}
                        initialValues={{cash: 0, card: 0}}
                    >
                        <Form.Item>
                            <LeftToPayBlock />
                        </Form.Item>
                        {payments.map((payment, key) => (
                            <Form.Item
                                label={payment.label}
                                key={payment.payment_id}
                                name={["payments", payment.payment_id]}
                                validateStatus={leftToPay > 0 ? "error" : "success"}
                            >
                                <InputNumber
                                    autoFocus={key === 0}
                                    onChange={val =>
                                        onChangePaymentHandler({
                                            ...payment,
                                            price: Number(val)
                                        })
                                    }
                                    formatter={val => formatPrice(Number(val))}
                                    style={{width: "100%"}}
                                />
                            </Form.Item>
                        ))}
                    </Form>
                    <PayChangeBlock />
                    <ProcessingBlock />
                </div>
                <Button
                    type="primary"
                    loading={loading}
                    disabled={disabled}
                    htmlType="submit"
                    form="pos-create-order"
                    className="button-finish"
                >
                    Завершить
                </Button>
            </div>
        </div>
    )
}
export default Container
