import React, {useCallback, useEffect, useState} from "react"
import styled from "./CartProductColumn.module.css"
import {Link} from "react-router-dom"
import {checkDiscount, formatPrice} from "../../../../utils/formatPrice"
import {useScreenSize} from "../../../../hooks/useScreenSize"
import {ProductColorCart} from "../../../../types/cart"
import RemoveButton from "./remove-button/RemoveButton"
import QtyInput from "./qty-input/QtyInput"
import ImageLink from "./image-link/ImageLink"
import {updateQtyCart} from "../../cartApi"
import {useDispatch} from "../../../store"

interface CartProductColumnProps {
    product: ProductColorCart
    addTotalPrice: (sku: ProductColorCart["sku"], price: ProductColorCart["price"]) => void
    removeProductFromTotalPrice: (sku: ProductColorCart["sku"]) => void
}

const CartProductColumn: React.FC<CartProductColumnProps> = ({
    product,
    addTotalPrice,
    removeProductFromTotalPrice
}) => {
    const [totalPrice, setTotalPrice] = useState(checkDiscount(product.price, product.discount))
    const {width} = useScreenSize()
    const dispatch = useDispatch()

    // Изменения цены продукта
    const onChangeHandler = useCallback(
        (val: number) => {
            // Обновление в состоянии проекта
            dispatch(updateQtyCart({sku: product.sku, qty: val}))
            // Цена со скидкой
            const lastPrice = checkDiscount(product.price, product.discount)
            // Общая цена
            setTotalPrice(val * lastPrice)
        },
        [dispatch, product]
    )

    useEffect(() => {
        addTotalPrice(product.sku, totalPrice)
    }, [totalPrice, product, addTotalPrice])

    return (
        <>
            <div className={styled.imageDetails}>
                <ImageLink id={product.id} image={product.url_thumbnail} />
                <div className={styled.details}>
                    <Link to={`/product/${product.id}`} className={styled.title}>
                        {product.title}
                    </Link>
                    <div className={styled.size}>{product.size.title}</div>
                    <div className={styled.price}>
                        {product.discount && (
                            <div className={styled.prevPrice}>
                                <span className={styled.oldPrice}>{formatPrice(product.price)}</span> -{" "}
                                <span className={styled.discount}>
                                    {Math.ceil(product.discount.discount)}%
                                </span>
                            </div>
                        )}
                        <div className={styled.mainPrice}>
                            {formatPrice(product.price, product.discount)} сум
                        </div>
                    </div>
                    {width < 767 && (
                        <div>
                            <QtyInput
                                qty={product.qty}
                                sizeQty={product.size.qty}
                                onChange={onChangeHandler}
                            />
                        </div>
                    )}
                </div>
            </div>
            {width > 767 && (
                <div className={styled.qty}>
                    <QtyInput qty={product.qty} sizeQty={product.size.qty} onChange={onChangeHandler} />
                    <RemoveButton
                        sku={product.sku}
                        removeProductFromTotalPrice={removeProductFromTotalPrice}
                    />
                </div>
            )}
            <div className={styled.total}>
                <div className={styled.totalPrice}>{formatPrice(totalPrice)} сум</div>
                {width < 767 && (
                    <RemoveButton
                        sku={product.sku}
                        removeProductFromTotalPrice={removeProductFromTotalPrice}
                    />
                )}
            </div>
        </>
    )
}

export default CartProductColumn
