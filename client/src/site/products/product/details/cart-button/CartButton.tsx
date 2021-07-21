import React from "react"
import styled from "../Details.module.css"
import Button from "components/button/Button"
import {useDispatch} from "../../../../store"
import {ProductColor} from "types/productColor"
import {addToCart, removeFromCart} from "../../../../cart/cartApi"
import {Size} from "types/Size"
import {useSelectAllSkuCart} from "../../../../cart/cartSlice"
import Dialog from "rc-dialog"
import ModalProductInfo from "./ModalProductInfo"
import "rc-dialog/assets/index.css"
import {useState} from "react"
import {useCallback} from "react"

interface CartButtonProps {
    product: ProductColor
    sizeId: Size["id"] | null
    outputErrorSizeHandler: any
}

const CartButton: React.FC<CartButtonProps> = ({product, sizeId, outputErrorSizeHandler}) => {
    const dispatch = useDispatch()
    const skus = useSelectAllSkuCart()
    const [visible, setVisible] = useState(false)

    const addToCartHandler = () => {
        const size = product.sizes_props.find(size => Number(size.size_id) === Number(sizeId))
        if (sizeId && size) {
            dispatch(addToCart(`PC${product.id}S${sizeId}`))
            setVisible(true)
        } else outputErrorSizeHandler()
    }

    const removeFromCartHandler = () => dispatch(removeFromCart(`PC${product.id}S${sizeId}`))

    const close = useCallback(() => setVisible(false), [])

    return (
        <>
            <div className={styled.addToCard}>
                {skus.find(sku => sku === `PC${product.id}S${sizeId}`) ? (
                    <Button type="secondary" block filled onClick={removeFromCartHandler}>
                        Удалить из корзины
                    </Button>
                ) : (
                    <Button type="secondary" block onClick={addToCartHandler}>
                        Добавить в корзину
                    </Button>
                )}
            </div>
            <Dialog visible={visible} width={380} closable={false} mask={false}>
                <ModalProductInfo product={product} close={close} />
            </Dialog>
        </>
    )
}

export default CartButton
