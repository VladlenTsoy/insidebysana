import React from "react"
import {Modal} from "antd"

const {confirm} = Modal

interface DeleteOrderProps {
    orderId: number
}

const DeleteOrder: React.FC<DeleteOrderProps> = ({orderId}) => {
    const onClickHandler = (e: any) => {
        e.preventDefault()
        confirm({
            title: `Вы действительно хотите удалить заказ #${orderId}?`,
            content: "Заказ так же удалится из истории клиента и общей статитики.",
            okType: "danger",
            onOk() {
                console.log("OK")
            }
        })
    }

    return <span onClick={onClickHandler}>Удалить</span>
}
export default DeleteOrder
