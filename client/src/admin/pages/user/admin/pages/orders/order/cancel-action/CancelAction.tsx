import React from "react"
import {Modal, Tooltip} from "antd"
import {ExclamationCircleOutlined, StopOutlined} from "@ant-design/icons"
import {Order} from "../../../../../../../lib/types/Order";
import {useDispatch} from "react-redux";
import {cancelOrder} from "../../../../../../../store/admin/order/cancelOrder";

const {confirm} = Modal

interface CancelActionProps {
    order: Order
}

const CancelAction: React.FC<CancelActionProps> = ({order}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        confirm({
            title: "Вы действительно хотите отменить сделку?",
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                await dispatch(cancelOrder(order.id))
            }
        })
    }

    return (
        <Tooltip title="Отменить сделку">
            <span className="action cancel" onClick={handleClick}>
                <StopOutlined />
            </span>
        </Tooltip>
    )
}

export default CancelAction
