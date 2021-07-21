import {CheckOutlined, ClockCircleFilled, StopFilled} from "@ant-design/icons"
import {Select, Tag, Modal} from "antd"
import {Order} from "types/Order"
import React, {useState} from "react"
// import {cancelOrder} from "store/admin/order/cancelOrder"
// import {changePaymentStateOrder} from "store/admin/order/changePaymentStateOrder"
// import {useAdminDispatch} from "store/admin/store"

interface PaymentStateSelectProps {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

const PaymentStateSelect: React.FC<PaymentStateSelectProps> = ({paymentState, orderId}) => {
    // const [loading, setLoading] = useState(false)
    // const [value, setValue] = useState(paymentState)
    // const dispatch = useAdminDispatch()

    const onChangeHandler = async (val: any) => {
        // if (val === -1)
        //     Modal.confirm({
        //         title: "Вы действительно хотите отменить сделку?",
        //         okText: "Да",
        //         onOk: async () => {
        //             setLoading(true)
        //             setValue(val)
        //             await dispatch(cancelOrder(orderId))
        //             setLoading(false)
        //         }
        //     })
        // else {
        //     setLoading(true)
        //     setValue(val)
        //     await dispatch(changePaymentStateOrder({orderId, paymentState: val}))
        //     if (val !== 1) setLoading(false)
        // }
    }

    return (
        <>
            {/* <Select style={{width: "100%"}} value={value} onChange={onChangeHandler} loading={loading}>
                <Select.Option value={0}>
                    <Tag color="processing" icon={<ClockCircleFilled />}>
                        Ожидание
                    </Tag>
                </Select.Option>
                <Select.Option value={1}>
                    <Tag color="success" icon={<CheckOutlined />}>
                        Оплачен
                    </Tag>
                </Select.Option>
                <Select.Option value={-1}>
                    <Tag color="error" icon={<StopFilled />}>
                        Отменен
                    </Tag>
                </Select.Option>
            </Select> */}
        </>
    )
}
export default PaymentStateSelect
