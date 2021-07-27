import React, {useState} from "react"
import styled from "./Payment.module.css"
import PaymentSvg from "assets/images/payment/payme.svg"
// import ApelsinSvg from "assets/images/payment/apelsin.png"
import CashSvg from "assets/images/payment/cash.svg"
import Button from "components/button/Button"
// import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined"
import TypesPayment from "./types-payment/TypesPayment"

interface PaymentProps {
    backAdditionalService: any
    information: any
    delivery: any
    onSubmitPayment: any
}

const Payment: React.FC<PaymentProps> = ({backAdditionalService, onSubmitPayment}) => {
    const [paymentId, setPaymentId] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const onClickHandler = async () => {
        setLoading(true)
        await onSubmitPayment(paymentId)
        setLoading(false)
    }

    const onChangeHandler = (paymentId: string) => {
        setPaymentId(Number(paymentId))
    }

    const types = [
        {id: 3, title: "Наличные", icon: CashSvg},
        {id: 1, title: "Payme", icon: PaymentSvg}
        // {id: 4, title: "Apelsin", icon: ApelsinSvg}
    ]

    return (
        <div className={styled.payment}>
            <div>
                <h2 style={{marginBottom: "1rem"}}>Тип оплаты</h2>
                <TypesPayment name="payment" types={types} onChange={onChangeHandler} />
            </div>
            <div className={styled.button}>
                {/* <Button onClick={backAdditionalService} link icon={<ArrowLeftOutlined />}>
                    Назад
                </Button> */}
                <Button type="default" onClick={onClickHandler} disabled={!paymentId} loading={loading}>
                    Заказать
                </Button>
            </div>
        </div>
    )
}

export default Payment
