import React from "react"
import styled from "./CartButton.module.css"
import Button from "antd/es/button"
import {useDispatch} from "print/store"
import {useSelectAllSkuCart, removeFromCart, addToCart} from "print/cart/cartSlice"
import {PrintProduct} from "print/print-products/productApi"

interface CartButtonProps {
    product: PrintProduct
    sizeId: number | null
    outputErrorSizeHandler: any
}

const CartButton: React.FC<CartButtonProps> = ({product, sizeId, outputErrorSizeHandler}) => {
    const dispatch = useDispatch()
    const skus = useSelectAllSkuCart()
    const currentSKU = `PR${product.print_image_id}PC${product.product_color_id}S${sizeId}`

    const addToCartHandler = () => {
        const size = product.sizes_props.find(size => Number(size.size_id) === Number(sizeId))
        if (sizeId && size) {
            dispatch(addToCart(currentSKU))
        } else outputErrorSizeHandler()
    }

    const removeFromCartHandler = () => dispatch(removeFromCart(currentSKU))

    return (
        <div className={styled.addToCard}>
            {skus.find(sku => sku === currentSKU) ? (
                <Button danger block onClick={removeFromCartHandler} size="large" className={styled.btnAddToCart}>
                    Удалить из корзины
                </Button>
            ) : (
                <Button block onClick={addToCartHandler} size="large" className={styled.btnAddToCart}>
                    Добавить в корзину
                </Button>
            )}
        </div>
    )
}

export default CartButton
