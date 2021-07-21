import React, {useCallback, useState} from "react"
import {useLoadingCart, useSelectAllProductCart} from "../cartSlice"
import LoaderBlock from "../../../components/loader-block/LoaderBlock"
import EmptyBlock from "../../../components/empty-block/EmptyBlock"
import styled from "../Cart.module.css"
import CartProductColumn from "./cart-product-column/CartProductColumn"
import {useScreenSize} from "../../../hooks/useScreenSize"
import CartTotal from "./cart-total/CartTotal"

export interface CartTotalPrice {
    sku: string
    price: number
}

interface CartProductsProps {
    openOrder: any
}

const CartProducts: React.FC<CartProductsProps> = ({openOrder}) => {
    const loading = useLoadingCart()
    const products = useSelectAllProductCart()
    const {width} = useScreenSize()
    const [totalPrice, setTotalPrice] = useState<CartTotalPrice[]>([])

    // Вывод всей суммы
    const addTotalPrice = useCallback((sku, price) => {
        setTotalPrice(prevState => {
            // Удаление предыдущей суммы продукта
            const nextState = prevState.filter(item => item.sku !== sku)
            return [...nextState, {sku, price}]
        })
    }, [])

    // Вывод всей суммы
    const removeProductFromTotalPrice = useCallback(sku => {
        setTotalPrice(prevState => {
            // Удаление предыдущей суммы продукта
            const nextState = prevState.filter(item => item.sku !== sku)
            return [...nextState]
        })
    }, [])

    if (loading) return <LoaderBlock />

    if (!products.length) return <EmptyBlock />

    return (
        <>
            <div className={styled.products}>
                <div className={styled.headerTitle}>Название</div>
                {width > 767 && <div className={styled.headerQty}>Кол-во</div>}
                <div className={styled.headerTotal}>Стоимость</div>
                {products.map((product: any) => (
                    <CartProductColumn
                        product={product}
                        key={product.sku}
                        addTotalPrice={addTotalPrice}
                        removeProductFromTotalPrice={removeProductFromTotalPrice}
                    />
                ))}
            </div>
            <div className={styled.cartTotal}>
                <CartTotal totalPrice={totalPrice} openOrder={openOrder} />
            </div>
        </>
    )
}

export default CartProducts
