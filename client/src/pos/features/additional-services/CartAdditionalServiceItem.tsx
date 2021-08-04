import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {useDispatch} from "pos/store"
import React, {useCallback} from "react"
import {updateQtyAdditionalService, removeAdditionalService} from "../cart/cartSlice"
import "./CartAdditionalServiceItem.less"

interface PlusMinusInputProps {
    id: number
    qty: number
}

const PlusMinusInput: React.FC<PlusMinusInputProps> = ({id, qty}) => {
    const dispatch = useDispatch()

    // Обновление кол-во в корзине
    const updateQtyToCart = useCallback(_qty => dispatch(updateQtyAdditionalService({id, qty: _qty})), [
        dispatch,
        id
    ])

    // При нажатии на плюс
    const plusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (qty > 0) updateQtyToCart(qty + 1)
        },
        [qty, updateQtyToCart]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (qty > 1) updateQtyToCart(qty - 1)
            else dispatch(removeAdditionalService(id))
        },
        [dispatch, id, qty, updateQtyToCart]
    )

    return (
        <div className="plus-minus-input">
            <div className="minus" onClick={minusHandler}>
                {qty > 0 ? (
                    qty === 1 ? (
                        <div className="btn btn-danger">
                            <DeleteOutlined />
                        </div>
                    ) : (
                        <div className="btn">
                            <MinusOutlined />
                        </div>
                    )
                ) : (
                    <div className="btn">
                        <StopOutlined />
                    </div>
                )}
            </div>
            <div className="count">{qty}</div>
            <div className="plus" onClick={plusHandler}>
                {qty && (
                    <div className="btn">
                        <PlusOutlined />
                    </div>
                )}
            </div>
        </div>
    )
}

interface CartAdditionalServiceItemProps {
    additionalService: {
        id: number
        title: string
        price: number
        qty: number
    }
}

const CartAdditionalServiceItem: React.FC<CartAdditionalServiceItemProps> = ({additionalService}) => {
    return (
        <>
            <div className="cart-product-item">
                <div className="details">
                    <div className="title">{additionalService.title}</div>
                    <div className="price-size">
                        <PriceBlock price={additionalService.price} />
                    </div>
                </div>
                <div>
                    <PlusMinusInput id={additionalService.id} qty={additionalService.qty} />
                </div>
            </div>
        </>
    )
}
export default CartAdditionalServiceItem
