import React from "react"
import CashImage from "assets/images/payment/cash.svg"
import PaymeImage from "assets/images/payment/payme.svg"
import ApelsinImage from "assets/images/payment/apelsin.png"
import CreditCardImage from "assets/images/payment/credit-card-payment.png"
import ClickImage from "assets/images/payment/click.png"
import {changePriceToPayment, useCartParams} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {addOrDeletePayment} from "pos/features/cart/cartSlice"
import "./Payments.less"
import {Button, Form, InputNumber} from "antd"
import {PosOrderPayment} from "../PosOrderPayment"
import {formatPrice} from "utils/formatPrice"
import {CloseOutlined} from "@ant-design/icons"

const Payments: React.FC = () => {
    const {payments, leftToPay} = useCartParams()
    const dispatch = useDispatch()

    const paymentMethods = [
        {
            label: "Наличные",
            icon: CashImage,
            payment_id: 3
        },
        {
            label: "Карта",
            icon: CreditCardImage,
            payment_id: 5
        },
        {
            label: "Payme",
            icon: PaymeImage,
            payment_id: 1
        },
        {
            label: "Apelsin",
            icon: ApelsinImage,
            payment_id: 4
        },
        {
            label: "Click",
            icon: ClickImage,
            payment_id: 2
        }
    ]

    const onChangePayments = (payment: any) => dispatch(addOrDeletePayment({...payment, price: 0}))
    const onChangePaymentHandler = (payment: PosOrderPayment) => dispatch(changePriceToPayment(payment))

    return (
        <div className="payments-card">
            <div className="payments-list">
                {paymentMethods.map(method => (
                    <div
                        className={`payment-item ${
                            payments.find(payment => payment.payment_id === method.payment_id) ? "active" : ""
                        }`}
                        key={method.payment_id}
                        onClick={() => onChangePayments(method)}
                    >
                        <img src={method.icon} alt={method.label} />
                        <span>{method.label}</span>
                    </div>
                ))}
            </div>
            <div className="form-payments-list">
                {payments.map((payment, key) => (
                    <div className="payment-form-item" key={payment.payment_id}>
                        <div className="title">{payment.label}</div>
                        <Form.Item
                            name={["payments", payment.payment_id]}
                            validateStatus={leftToPay > 0 ? "error" : "success"}
                        >
                            <InputNumber
                                autoFocus={key === 0}
                                value={payment.price}
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
                        <div className="action">
                            <Button
                                danger
                                icon={<CloseOutlined />}
                                shape="circle"
                                onClick={() => onChangePayments(payment)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Payments
