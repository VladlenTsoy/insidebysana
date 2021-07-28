import React from "react"
import CashImage from "assets/images/payment/cash.svg"
import PaymeImage from "assets/images/payment/payme_01.svg"
import ApelsinImage from "assets/images/payment/apelsin-v1.png"
import CreditCardImage from "assets/images/payment/credit-card-payment.png"
import ClickImage from "assets/images/payment/click.png"
import {usePayments} from "pos/features/cart/cartSlice"
import {useDispatch} from "pos/store"
import {addOrDeletePayment} from "pos/features/cart/cartSlice"

const PaymentBlock: React.FC = () => {
    const checkedPayments = usePayments()
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

    return (
        <div className="payments-block">
            {paymentMethods.map(method => (
                <div
                    className={`payment-block ${
                        checkedPayments.find(payment => payment.payment_id === method.payment_id)
                            ? "active"
                            : ""
                    }`}
                    key={method.payment_id}
                    onClick={() => onChangePayments(method)}
                >
                    <div className="title">
                        <img src={method.icon} alt={method.label} />
                        <span>{method.label}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default React.memo(PaymentBlock)
