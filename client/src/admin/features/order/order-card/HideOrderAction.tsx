import React from "react"
import {Modal} from "antd"
import {hideOrder} from "./hideOrder"
import {useDispatch} from "react-redux"

const {confirm} = Modal

interface HideOrderProps {
    orderId: number
}

const HideOrder: React.FC<HideOrderProps> = ({orderId}) => {
    const dispatch = useDispatch()

    const onClickHandler = (e: any) => {
        e.preventDefault()
        confirm({
            title: `Вы действительно хотите отправить заказ #${orderId} в корзину?`,
            okType: "danger",
            onOk() {
                dispatch(hideOrder(orderId))
            }
        })
    }

    return <span onClick={onClickHandler}>В корзину</span>
}
export default HideOrder
