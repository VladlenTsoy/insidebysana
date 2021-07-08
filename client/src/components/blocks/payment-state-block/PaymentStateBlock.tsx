import {CheckOutlined, ClockCircleFilled, StopFilled} from "@ant-design/icons"
import {Tag} from "antd"
import {Order} from "types/Order"
import React from "react"
import PaymentStateSelect from "./PaymentStateSelect"

interface PaymentStateBlockProps {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
    isEdit?: boolean
}

const PaymentStateBlock: React.FC<PaymentStateBlockProps> = ({paymentState, isEdit, orderId}) => {
    if (isEdit && paymentState !== 1)
        return <PaymentStateSelect paymentState={paymentState} orderId={orderId} />

    return (
        <>
            {paymentState === 1 && (
                <Tag color="success" icon={<CheckOutlined />}>
                    Оплачен
                </Tag>
            )}
            {paymentState === -1 && (
                <Tag color="error" icon={<StopFilled />}>
                    Отменен
                </Tag>
            )}
            {paymentState === 0 && (
                <Tag color="processing" icon={<ClockCircleFilled />}>
                    Ожидание
                </Tag>
            )}
        </>
    )
}
export default PaymentStateBlock
