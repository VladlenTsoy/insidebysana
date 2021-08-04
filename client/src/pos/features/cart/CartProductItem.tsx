import {Tag} from "antd"
import React, {useCallback} from "react"
import {addToCart, removeFromCart, updateQty} from "pos/features/cart/cartSlice"
import {useDispatch} from "../../store"
import {CartProductItemType} from "pos/features/cart/cart"
import {ProductCardType} from "pos/features/product/product"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import "./CartProductItem.less"

interface PlusMinusInputProps {
    productCart: CartProductItemType
    selectSize: ProductCardType["sizes_props"][0]
}

const PlusMinusInput: React.FC<PlusMinusInputProps> = ({productCart, selectSize}) => {
    const dispatch = useDispatch()
    const {product_color_id, size_id, product} = productCart

    // Обновление кол-во в корзине
    const updateQtyToCart = useCallback(qty => dispatch(updateQty({product_color_id, size_id, qty: qty})), [
        dispatch,
        product_color_id,
        size_id
    ])

    // При нажатии на плюс
    const plusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (productCart.qty >= selectSize.qty) return
            if (productCart.qty > 0) updateQtyToCart(productCart.qty + 1)
            else dispatch(addToCart({size_id, product_color_id, product, qty: 1}))
        },
        [dispatch, product_color_id, size_id, product, updateQtyToCart, productCart, selectSize]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (productCart.qty > 1) updateQtyToCart(productCart.qty - 1)
            else dispatch(removeFromCart({size_id, product_color_id}))
        },
        [dispatch, productCart, updateQtyToCart, size_id, product_color_id]
    )

    return (
        <div className="plus-minus-input">
            <div className="minus" onClick={minusHandler}>
                {productCart.qty > 0 ? (
                    productCart.qty === 1 ? (
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
            <div className="count">{productCart.qty}</div>
            <div className="plus" onClick={plusHandler}>
                {productCart.qty < selectSize.qty && (
                    <div className="btn">
                        <PlusOutlined />
                    </div>
                )}
            </div>
        </div>
    )
}

interface ProductCartProps {
    cartProduct: CartProductItemType
}

const ProductCart: React.FC<ProductCartProps> = ({cartProduct}) => {
    const {product} = cartProduct
    const selectSize = product.sizes_props.find(size => size.size_id === cartProduct.size_id)

    // Дейиствие при нажатии
    const onClickHadnler = (e: any) => {
        createRipple(e)
        const productCardSearch = document.querySelector(`#product-item-${cartProduct.product_color_id}`)
        if (productCardSearch) {
            // productCardSearch.classList.add("active")
            productCardSearch.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }

    // Анимация клика
    const createRipple = (event: any) => {
        const button = event.currentTarget

        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight) / 4
        const radius = diameter / 2

        const rect = button.getBoundingClientRect()

        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - rect.x - radius}px`
        circle.style.top = `${event.clientY - rect.y - radius}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]

        if (ripple) {
            ripple.remove()
        }

        button.appendChild(circle)
    }

    if (selectSize)
        return (
            <div className="cart-product-item">
                <div className="details" onClick={onClickHadnler}>
                    <div className="title">
                        {product.title} ({product.color.title})
                    </div>
                    <div className="price-size">
                        <PriceBlock price={product.price} discount={product.discount} />
                        <Tag color="#fe9c64">XS (12)</Tag>
                    </div>
                </div>
                <div>
                    <PlusMinusInput productCart={cartProduct} selectSize={selectSize} />
                </div>
            </div>
        )
    return null
}
export default React.memo(ProductCart)
