import React from "react"
import styled from "./CartTotal.module.css"
import {formatPrice} from "../../../../utils/formatPrice"
import Button from "../../../../components/button/Button"
import {CartTotalPrice} from "../CartProducts"

interface CartTotalProps {
    totalPrice: CartTotalPrice[]
    openOrder: any
}

const CartTotal: React.FC<CartTotalProps> = ({totalPrice, openOrder}) => {
    return (
        <div className={styled.total}>
            <div className={styled.totalTitlePrice}>
                <div className={styled.totalTitle}>Итого:</div>
                <div className={styled.totalPrice}>
                    {formatPrice(totalPrice.reduce((acc, curr) => acc + curr.price, 0))} сум
                </div>
            </div>
            <div className={styled.totalAction}>
                <Button onClick={openOrder}>Оформить заказ</Button>
            </div>
        </div>
    )
}

export default CartTotal
