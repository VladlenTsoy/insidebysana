import {OrderCardType} from "admin/features/order/Order"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {addOrder, updateOrder} from "admin/features/order/orderSlice"
import socket from "admin/utils/socket"

const EventsProvider: React.FC = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const createOrderListener = (order: OrderCardType) => {
            dispatch(addOrder(order))
        }

        socket.on("order_create", createOrderListener)

        const updateOrderListener = (order: OrderCardType) => {
            dispatch(updateOrder(order))
        }

        socket.on("order_update", updateOrderListener)
        return () => {
            socket.off("order_create", createOrderListener)
            socket.off("order_update", updateOrderListener)
        }
    }, [dispatch])

    return <>{children}</>
}
export default EventsProvider
