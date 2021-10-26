import React, {useCallback, useState} from "react"
import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import {Radio} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {useDispatch} from "../../store"
import {addToCart, removeFromCart, useCartProductColors, updateQty} from "../cart/cartSlice"
import {formatPrice} from "utils/formatPrice"
import {motion, AnimatePresence} from "framer-motion"
import "./ProductCard.less"
import {ProductCardType} from "./product"
import {formatDiscount} from "utils/formatDiscount"

type SelectSize = number | null

interface ThumbnailActionsProps {
    product: ProductCardType
    selectSize: ProductCardType["sizes"][0]
    changeSelectSize: (size: SelectSize) => void
}

const ThumbnailActions: React.FC<ThumbnailActionsProps> = ({product, selectSize, changeSelectSize}) => {
    const dispatch = useDispatch()
    const cartProducts = useCartProductColors()

    // Поиск кол-во по размеру в товаре
    const searchCartQtyBySize = useCallback(
        (size: ProductCardType["sizes"][0]) => {
            if (size) {
                const findProduct = cartProducts.find(
                    cartProduct =>
                        cartProduct.product_color_id === product.id && cartProduct.size_id === size.size_id
                )
                if (findProduct) return findProduct.qty
            }
            return 0
        },
        [product, cartProducts]
    )

    // Обновление кол-во в корзине
    const updateQtyToCart = useCallback(
        qty => dispatch(updateQty({product_color_id: product.id, size_id: selectSize.size_id, qty: qty})),
        [dispatch, selectSize, product]
    )

    // При нажатии на плюс
    const plusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            createRipple(e)
            const qty = searchCartQtyBySize(selectSize)
            if (qty >= selectSize.qty) return
            if (qty > 0) updateQtyToCart(qty + 1)
            else
                dispatch(
                    addToCart({size_id: selectSize.size_id, product_color_id: product.id, product, qty: 1})
                )
        },
        [dispatch, selectSize, product, updateQtyToCart, searchCartQtyBySize]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            createRipple(e)
            const qty = searchCartQtyBySize(selectSize)
            if (qty > 1) updateQtyToCart(qty - 1)
            else {
                dispatch(removeFromCart({size_id: selectSize.size_id, product_color_id: product.id}))
                changeSelectSize(null)
            }
        },
        [selectSize, dispatch, searchCartQtyBySize, updateQtyToCart, product, changeSelectSize]
    )

    // Создание анимации
    const createRipple = (event: any) => {
        const button = event.currentTarget.parentElement

        const circle = document.createElement("span")
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2

        const rect = button.getBoundingClientRect()

        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - rect.x - radius}px`
        circle.style.top = `${event.clientY - rect.y - radius}px`
        circle.classList.add("ripple")

        const ripple = button.getElementsByClassName("ripple")[0]

        if (ripple) ripple.remove()
        button.appendChild(circle)
    }

    return (
        <motion.div
            layout
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="add-to-cart-block"
        >
            <div className="minus" onClick={minusHandler}>
                {searchCartQtyBySize(selectSize) > 0 ? (
                    searchCartQtyBySize(selectSize) === 1 ? (
                        <DeleteOutlined />
                    ) : (
                        <MinusOutlined />
                    )
                ) : (
                    <StopOutlined />
                )}
            </div>
            <div className="count">{searchCartQtyBySize(selectSize)}</div>
            <div className="plus" onClick={plusHandler}>
                {searchCartQtyBySize(selectSize) < selectSize.qty && <PlusOutlined />}
            </div>
            {selectSize && <div className="remainder">Осталось: {selectSize.qty || 0}</div>}
        </motion.div>
    )
}

interface ProductCardProps {
    product: ProductCardType
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const [selectSize, setSelectSize] = useState<ProductCardType["sizes"][0] | undefined>()

    // Изменить выбранный размер
    const changeSelectSize = useCallback(
        (sizeId: SelectSize) => {
            const size = product.sizes.find(size => size.size_id === sizeId)
            setSelectSize(size)
        },
        [product]
    )

    // Выбор размер
    const onChangeHandler = (e: any) => changeSelectSize(Number(e.target.value))

    // Нажатие на размер
    const onClickHandler = (e: any) => {
        if (selectSize && Number(e.target.value) === selectSize.size_id) setSelectSize(undefined)
    }

    return (
        <motion.div
            className="product-card"
            id={`product-item-${product.id}`}
            layout
            variants={{
                hidden: {y: 20, opacity: 0, filter: "blur(5px)"},
                visible: {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)"
                },
                exit: {opacity: 0, filter: "blur(5px)"}
            }}
        >
            <div className="thumbnail">
                <div className="color">
                    <span className="hex" style={{background: product.color.hex}} />
                    <span className="title">{product.color.title}</span>
                </div>
                {product.discount && (
                    <div className="discount">-{formatDiscount(product.discount.discount)}%</div>
                )}
                <ImageBlock image={product.url_thumbnail} />
                <AnimatePresence>
                    {selectSize && (
                        <ThumbnailActions
                            selectSize={selectSize}
                            product={product}
                            changeSelectSize={changeSelectSize}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className="details">
                <div className="title">{product.title}</div>
                {product.discount && <div className="price-discount">{formatPrice(product.price)} сум</div>}
                <div className="price">{formatPrice(product.price, product.discount)} сум</div>
            </div>
            <div className="sizes-action">
                <Radio.Group onChange={onChangeHandler} size="large" value={selectSize?.size_id || null}>
                    {product.sizes.map(
                        size =>
                            size.qty > 0 && (
                                <Radio.Button
                                    key={`PC${product.id}S${size.size_id}`}
                                    value={size.size_id}
                                    className="button-size"
                                    onClick={onClickHandler}
                                >
                                    {size.title}
                                </Radio.Button>
                            )
                    )}
                </Radio.Group>
            </div>
        </motion.div>
    )
}

export default React.memo<ProductCardProps>(ProductCard)
