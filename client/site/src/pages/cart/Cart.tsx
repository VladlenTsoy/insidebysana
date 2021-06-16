import React, {useEffect, useState} from "react"
import Title from "../../components/title/Title"
import styled from "./Cart.module.css"
import CartProducts from "./cart-products/CartProducts"
import {fetchCart} from "../../store/cart/fetchCart"
import {useDispatch} from "../../store/store"
import OrderingDrawer from "./order/Order"
import Drawer from "../../components/drawer/Drawer"

const Cart: React.FC = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const openOrder = () => setVisible(true)
    const closeOrder = () => setVisible(false)

    useEffect(() => {
        const promise = dispatch(fetchCart())
        return () => {
            promise.abort()
        }
    }, [dispatch])

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
