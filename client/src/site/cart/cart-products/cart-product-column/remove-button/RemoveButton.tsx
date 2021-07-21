import React from "react"
import styled from "./RemoveButton.module.css"
import {removeFromCart} from "../../../cartApi"
import {ProductColorCart} from "types/cart"
import {useDispatch} from "../../../../store"

interface RemoveButtonProps {
    sku: ProductColorCart["sku"]
    removeProductFromTotalPrice: any
}

const RemoveButton: React.FC<RemoveButtonProps> = ({sku, removeProductFromTotalPrice}) => {
    const dispatch = useDispatch()

    // Удаление из корзины
    const onRemoveHandler = () => {
        dispatch(removeFromCart(sku))
        removeProductFromTotalPrice(sku)
    }

    return (
        <div className={styled.remove} onClick={onRemoveHandler}>
            Удалить
        </div>
    )
}

export default React.memo<RemoveButtonProps>(RemoveButton)
