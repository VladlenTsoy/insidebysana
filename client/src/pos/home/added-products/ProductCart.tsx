import {Tag} from "antd"
import React, {useCallback} from "react"
import {addToCart, removeFromCart, updateQty} from "../posSlice"
import {useDispatch} from "../../store"
import {ProductColorCart} from "types/cashier/PosProductColor"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import "./ProductCart.less"
import {useSelectAllPosProductColors} from "pos/home/posSelectors"

interface PlusMinusInputProps {
    productCart: ProductColorCart
}

const PlusMinusInput: React.FC<PlusMinusInputProps> = ({productCart}) => {
    const dispatch = useDispatch()
    const cartProducts = useSelectAllPosProductColors()
    const {product_color_id, size_id, product} = productCart

    // Поиск кол-во по размеру в товаре
    const searchQtyBySize = useCallback(() => {
        const findProduct = cartProducts.find(
            cartProduct =>
                cartProduct.product_color_id === product_color_id && cartProduct.size_id === size_id
        )
        if (findProduct) return findProduct.qty
        return 0
    }, [product_color_id, size_id, cartProducts])

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
            if (searchQtyBySize() >= product.sizes[size_id].qty) return
            const qty = searchQtyBySize()
            if (qty > 0) updateQtyToCart(qty + 1)
            else dispatch(addToCart({size_id, product_color_id, product, qty: 1}))
        },
        [dispatch, product_color_id, size_id, product, updateQtyToCart, searchQtyBySize]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            const qty = searchQtyBySize()
            if (qty > 1) updateQtyToCart(qty - 1)
            else dispatch(removeFromCart({size_id, product_color_id}))
        },
        [dispatch, searchQtyBySize, updateQtyToCart, size_id, product_color_id]
    )

    return (
        <div className="plus-minus-input">
            <div className="minus" onClick={minusHandler}>
                {searchQtyBySize() > 0 ? (
                    searchQtyBySize() === 1 ? (
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
            <div className="count">{searchQtyBySize()}</div>
            <div className="plus" onClick={plusHandler}>
                {searchQtyBySize() < product.sizes[size_id].qty && (
                    <div className="btn">
                        <PlusOutlined />
                    </div>
                )}
            </div>
        </div>
    )
}

interface ProductCartProps {
    product: ProductColorCart
}

const ProductCart: React.FC<ProductCartProps> = ({product}) => {
    const onClickHadnler = (e: any) => {
        createRipple(e)
        const productCardSearch = document.querySelector(`#product-item-${product.product_color_id}`)
        if (productCardSearch) {
            productCardSearch.classList.add("active")
            productCardSearch.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }

    function createRipple(event: any) {
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

    return (
        <div className="cart-product-item">
            <div className="details" onClick={onClickHadnler}>
                <div className="title">
                    {product.product.details.title} ({product.product.color.title})
                </div>
                <div className="price-size">
                    <PriceBlock price={product.product.details.price} discount={product.product.discount} />
                    <Tag color="#fe9c64">XS (12)</Tag>
                </div>
            </div>
            <div>
                <PlusMinusInput productCart={product} />
            </div>
        </div>
    )
}
export default ProductCart
