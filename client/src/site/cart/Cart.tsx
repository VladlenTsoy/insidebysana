import React, {useState} from "react"
import Title from "../../components/title/Title"
import styled from "./Cart.module.css"
import CartProducts from "./cart-products/CartProducts"
import OrderingDrawer from "./order/Order"
import Drawer from "../../components/drawer/Drawer"
import {useParams} from "react-router-dom"

const Cart: React.FC = () => {
    const params = useParams<{order: string}>()
    const [visible, setVisible] = useState(!!params.order)

    const openOrder = () => setVisible(true)
    const closeOrder = () => setVisible(false)

    return (
        <>
            <Title level={1}>Корзина</Title>
            <div className={styled.container}>
                <CartProducts openOrder={openOrder} />
            </div>
            <Drawer visible={visible} width="100%" placement="right" onClose={closeOrder}>
                <OrderingDrawer onClose={closeOrder} />
            </Drawer>
        </>
    )
}

export default Cart
