import React, {useCallback, useState} from "react"
import OrderCreation from "./order-creation/OrderCreation"
import OrderSuccessful from "./order-successful/OrderSuccessful"

interface OrderingDrawerProps {
    onClose: () => void
}

const OrderingDrawer: React.FC<OrderingDrawerProps> = ({onClose}) => {
    const [orderId, setOrderId] = useState<number | null>(null)

    const updateOrderId = useCallback((orderId: number) => {
        setOrderId(orderId)
    }, [])

    if (orderId) return <OrderSuccessful onClose={onClose} orderId={orderId} />

    return <OrderCreation onClose={onClose} updateOrderId={updateOrderId} />
}

export default React.memo(OrderingDrawer)
