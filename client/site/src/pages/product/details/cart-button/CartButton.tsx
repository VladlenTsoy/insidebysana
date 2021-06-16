import React from "react"
import styled from "../Details.module.css"
import Button from "../../../../components/button/Button"
import {useDispatch} from "../../../../store/store"
import {ProductColor} from "../../../../types/productColor"
import {addToCart} from "../../../../store/cart/addToCart"
import {Size} from "../../../../types/size"
import {removeFromCart} from "../../../../store/cart/removeFromCart"
import {useSelectAllSkuCart} from "../../../../store/cart/cartSelector"

interface CartButtonProps {
    product: ProductColor
    sizeId: Size["id"] | null
    outputErrorSizeHandler: any
}

const CartButton: React.FC<CartButtonProps> = ({product, sizeId, outputErrorSizeHandler}) => {
    const dispatch = useDispatch()
    const skus = useSelectAllSkuCart()

    const addToCartHandler = () => {
        const size = product.sizes_props.find(size => Number(size.size_id) === Number(sizeId))
        if (sizeId && size) {
            dispatch(addToCart(`PC${product.id}S${sizeId}`))
        } else
            outputErrorSizeHandler()
    }

    const removeFromCartHandler = () =>
        dispatch(removeFromCart(`PC${product.id}S${sizeId}`))

    return (
        <div className={styled.addToCard}>
            {
                skus.find(sku => sku === `PC${product.id}S${sizeId}`) ?
                    <Button type="secondary" block filled onClick={removeFromCartHandler}>
                        Удалить из корзины
                    </Button> :
                    <Button type="secondary" block onClick={addToCartHandler}>Добавить в корзину</Button>
            }
        </div>
    )
}

export default CartButton