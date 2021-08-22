import React from "react"
import {Modal} from "antd"
import {useDispatch} from "react-redux"
import {sendToArchiveOrder} from "./sendToArchiveOrder"

const {confirm} = Modal

interface SendToArchiveOrderProps {
    orderId: number
}

const SendToArchiveOrder: React.FC<SendToArchiveOrderProps> = ({orderId}) => {
    const dispatch = useDispatch()

    const onClickHandler = (e: any) => {
        e.preventDefault()
        confirm({
            title: `Вы действительно хотите отправить заказ #${orderId} в архив?`,
            onOk() {
                dispatch(sendToArchiveOrder(orderId))
            }
        })
    }

    return <span onClick={onClickHandler}>В архив</span>
}
export default SendToArchiveOrder
