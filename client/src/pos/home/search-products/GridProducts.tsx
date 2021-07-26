import {Empty} from "antd"
import LoadingBlock from "components/blocks/loading-block/LoadingBlock"
import React, {useCallback, useState} from "react"
import {DeleteOutlined, MinusOutlined, PlusOutlined, StopOutlined} from "@ant-design/icons"
import {Radio} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import {useGetSizeQuery} from "./sizeApi"
import {ProductColorCard} from "types/cashier/PosProductColor"
import {useDispatch} from "../../store"
import {addToCart, removeFromCart} from "../posSlice"
import {
    useLoadingPosProductColors,
    usePosProductColorCards,
    useSelectAllPosProductColors
} from "../posSelectors"
import "./GridProducts.less"
import {formatPrice} from "utils/formatPrice"
import {updateQty} from "admin/store/cashier/pos/posSlice"
import {motion, AnimatePresence} from "framer-motion"

type SelectSize = number | null

interface CardProductThumbnailProps {
    product: ProductColorCard
    selectSize: SelectSize
    changeSelectSize: (size: SelectSize) => void
}

const CardProductThumbnail: React.FC<CardProductThumbnailProps> = ({
    product,
    selectSize,
    changeSelectSize
}) => {
    const dispatch = useDispatch()
    const cartProducts = useSelectAllPosProductColors()

    // Поиск кол-во по размеру в товаре
    const searchQtyBySize = useCallback(
        size => {
            if (size) {
                const findProduct = cartProducts.find(
                    cartProduct => cartProduct.product_color_id === product.id && cartProduct.size_id === size
                )
                if (findProduct) return findProduct.qty
            }
            return 0
        },
        [product, cartProducts]
    )

    // Обновление кол-во в корзине
    const updateQtyToCart = useCallback(
        qty =>
            selectSize && dispatch(updateQty({product_color_id: product.id, size_id: selectSize, qty: qty})),
        [dispatch, selectSize, product]
    )

    // При нажатии на плюс
    const plusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            createRipple(e)
            if (!selectSize) return
            if (searchQtyBySize(selectSize) >= product.sizes[selectSize].qty) return
            const qty = searchQtyBySize(selectSize)
            if (qty > 0) updateQtyToCart(qty + 1)
            else dispatch(addToCart({size_id: selectSize, product_color_id: product.id, product, qty: 1}))
        },
        [dispatch, selectSize, product, updateQtyToCart, searchQtyBySize]
    )

    // При нажатии на минус
    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            createRipple(e)
            if (!selectSize) return
            const qty = searchQtyBySize(selectSize)
            if (qty > 1) updateQtyToCart(qty - 1)
            else {
                dispatch(removeFromCart({size_id: selectSize, product_color_id: product.id}))
                changeSelectSize(null)
            }
        },
        [selectSize, dispatch, searchQtyBySize, updateQtyToCart, product, changeSelectSize]
    )

    function createRipple(event: any) {
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

        if (ripple) {
            ripple.remove()
        }

        button.appendChild(circle)
    }

    // const buttons = document.getElementsByTagName("button")
    // for (const button of buttons) {
    // button.addEventListener("click", createRipple)
    // }

    return (
        <div className="thumbnail">
            <div className="color">
                <span className="hex" style={{background: product.color.hex}} />
                <span className="title">{product.color.title}</span>
            </div>
            {product.discount && <div className="discount">-{Math.ceil(product.discount.discount)}%</div>}
            <ImageBlock image={product.url_thumbnail} />
            <AnimatePresence>
                {selectSize && (
                    <motion.div
                        layout
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        className="add-to-cart-block"
                    >
                        <div className="minus" onClick={minusHandler}>
                            {searchQtyBySize(selectSize) > 0 ? (
                                searchQtyBySize(selectSize) === 1 ? (
                                    <DeleteOutlined />
                                ) : (
                                    <MinusOutlined />
                                )
                            ) : (
                                <StopOutlined />
                            )}
                        </div>
                        <div className="count">{searchQtyBySize(selectSize)}</div>
                        <div className="plus" onClick={plusHandler}>
                            {searchQtyBySize(selectSize) < product.sizes[selectSize].qty && <PlusOutlined />}
                        </div>
                        {selectSize && (
                            <div className="remainder">Осталось: {product.sizes[Number(selectSize)].qty}</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface CardProductProps {
    product: ProductColorCard
}

const CardProduct: React.FC<CardProductProps> = ({product}) => {
    const {data: sizes} = useGetSizeQuery()
    const [selectSize, setSelectSize] = useState<SelectSize>(null)

    // Выбор размер
    const onChangeHandler = (e: any) => setSelectSize(Number(e.target.value))

    // Изменить выбранный размер
    const changeSelectSize = useCallback((size: SelectSize) => setSelectSize(size), [])

    // Нажатие на размер
    const onClickHandler = (e: any) => Number(e.target.value) === selectSize && setSelectSize(null)

    // Вывод
    const outputQty = (qty: number, min_qty: number) =>
        qty <= min_qty ? <span className="qty">{qty > 100 ? "+99" : qty}</span> : null

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
            <CardProductThumbnail
                selectSize={selectSize}
                product={product}
                changeSelectSize={changeSelectSize}
            />
            <div className="details">
                <div className="title">{product.details.title}</div>
                {product.discount && (
                    <div className="price-discount">{formatPrice(product.details.price)} сум</div>
                )}
                <div className="price">{formatPrice(product.details.price, product.discount)} сум</div>
            </div>
            <div className="sizes-action">
                <Radio.Group onChange={onChangeHandler} size="large" value={String(selectSize)}>
                    {Object.keys(product.sizes).map(
                        key =>
                            product.sizes[Number(key)].qty > 0 && (
                                <Radio.Button
                                    key={`PC${product.id}S${key}`}
                                    value={key}
                                    className="button-size"
                                    onClick={onClickHandler}
                                >
                                    {sizes && sizes.find(size => size.id === Number(key))?.title}
                                    {outputQty(
                                        product.sizes[Number(key)].qty,
                                        product.sizes[Number(key)].min_qty
                                    )}
                                </Radio.Button>
                            )
                    )}
                </Radio.Group>
            </div>
        </motion.div>
    )
}
const GridProducts: React.FC = () => {
    const products = usePosProductColorCards()
    const loading = useLoadingPosProductColors()

    return (
        <div className="search-container">
            <AnimatePresence>
                {loading && (
                    <motion.div key="loading">
                        <LoadingBlock />
                    </motion.div>
                )}
                {!loading && !products.length && (
                    <motion.div key="empty">
                        <Empty />
                    </motion.div>
                )}
                {!loading && !!products.length && (
                    <motion.div
                        id="grid-products-list"
                        key="grid-products"
                        className="products-container"
                        animate="visible"
                        initial="hidden"
                        exit="exit"
                        variants={{
                            visible: {
                                transition: {
                                    delayChildren: 0.05,
                                    staggerChildren: 0.05
                                }
                            },
                            exit: {
                                transition: {
                                    delayChildren: 0.05,
                                    staggerChildren: 0.05,
                                    repeatType: "reverse"
                                }
                            }
                        }}
                    >
                        {products.map(product => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default React.memo(GridProducts)
