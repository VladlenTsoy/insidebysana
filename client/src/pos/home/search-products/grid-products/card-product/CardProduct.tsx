import {DeleteFilled, MinusOutlined, PlusOutlined} from "@ant-design/icons"
import {Button, Radio, Typography} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import React, {useCallback, useState} from "react"
import {useGetSizeQuery} from "../../size-select/sizeApi"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {ProductColorCard} from "types/cashier/PosProductColor"
import {useDispatch} from "../../../../store"
import {addToCart, removeFromCart} from "../../../posSlice"
import {useSelectAllPosProductColors} from "../../../posSelectors"
import "./CardProduct.less"
import {formatPrice} from "utils/formatPrice"
import {updateQty} from "admin/store/cashier/pos/posSlice"

const {Title} = Typography

interface CardProductProps {
    product: ProductColorCard
}

const CardProduct: React.FC<CardProductProps> = ({product}) => {
    const {data: sizes} = useGetSizeQuery()
    const [size, setSize] = useState<number | null>(null)
    const dispatch = useDispatch()
    const products = useSelectAllPosProductColors()
    const cartProducts = useSelectAllPosProductColors()

    //
    const addProduct = useCallback(product => dispatch(addToCart({...product, qty: 1})), [dispatch])

    // Удалить продукт
    const deleteProduct = useCallback(
        ({size_id, product_color_id}: any) => dispatch(removeFromCart({size_id, product_color_id})),
        [dispatch]
    )

    const isChecked = (key: number) =>
        products.find(_product => _product.size_id === key && _product.product_color_id === product.id)

    const onChangeHandler = (e: any) => {
        setSize(Number(e.target.value))
    }

    const addClickHandler = (e: any) => {
        e.preventDefault()
        if (!size) return
        addProduct({
            size_id: size,
            product_color_id: product.id,
            product
        })
    }

    const deleteClickHandler = (e: any) => {
        e.preventDefault()
        if (!size) return
        deleteProduct({
            size_id: size,
            product_color_id: product.id
        })
    }

    const outputQty = (qty: number, min_qty: number) =>
        qty <= min_qty ? <span className="qty">{qty > 100 ? "+99" : qty}</span> : null

    const isAdded = products.find(
        _product => _product.size_id === size && _product.product_color_id === product.id
    )

    //
    const qtyProduct = useCallback(
        qty => size && dispatch(updateQty({product_color_id: product.id, size_id: size, qty: qty})),
        [dispatch, size, product]
    )

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

    const plusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (!size) return
            const qty = searchQtyBySize(size)
            if (qty > 0) qtyProduct(qty + 1)
            else
                addProduct({
                    size_id: size,
                    product_color_id: product.id,
                    product
                })
        },
        [addProduct, size, product, qtyProduct, searchQtyBySize]
    )

    const minusHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            const qty = searchQtyBySize(size)
            if (!size) return
            if (qty > 1) qtyProduct(qty - 1)
            else {
                deleteProduct({
                    size_id: size,
                    product_color_id: product.id
                })
                setSize(null)
            }
        },
        [size, deleteProduct, searchQtyBySize, qtyProduct, product]
    )

    console.log(size)

    return (
        <div className="product-card">
            <div className="wrap-details">
                <div className="thumbnail">
                    <div className="color">
                        <span className="hex" style={{background: "#ff6370"}} />
                        <span className="title">{product.color.title}</span>
                    </div>
                    {product.discount && (
                        <div className="discount">-{Math.ceil(product.discount.discount)}%</div>
                    )}
                    <ImageBlock image={product.url_thumbnail} />
                    {/* <span className="price">{formatPrice(product.details.price, product.discount)} сум</span> */}
                    {size && (
                        <div className="add-to-cart-block">
                            <div className="minus" onClick={minusHandler}>
                                {searchQtyBySize(size) > 0 ? (
                                    searchQtyBySize(size) === 1 ? (
                                        <DeleteFilled />
                                    ) : (
                                        <MinusOutlined />
                                    )
                                ) : null}
                            </div>
                            <div className="count">{searchQtyBySize(size)}</div>
                            <div className="plus" onClick={plusHandler}>
                                <PlusOutlined />
                            </div>
                            {size && (
                                <div className="remainder">Осталось: {product.sizes[Number(size)].qty}</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="details">
                    <div className="title">{product.details.title}</div>
                    <div className="price-discount">{formatPrice(product.details.price, product.discount)} сум</div>
                    <div className="price">{formatPrice(product.details.price, product.discount)} сум</div>
                    {/* <div>
                        <PriceBlock price={product.details.price} discount={product.discount} />
                    </div> */}
                </div>
            </div>
            <div className="sizes-action">
                <Radio.Group onChange={onChangeHandler} size="large">
                    {Object.keys(product.sizes).map(
                        key =>
                            product.sizes[Number(key)].qty > 0 && (
                                <Radio.Button
                                    key={`PC${product.id}S${key}`}
                                    value={key}
                                    data-max={product.sizes[Number(key)].qty}
                                    className={`${isChecked(Number(key)) && "added"} button-size`}
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
            {/* {isAdded ? (
                <Button
                    type="primary"
                    danger
                    disabled={!size}
                    block
                    icon={<DeleteFilled />}
                    onClick={deleteClickHandler}
                >
                    Удалить
                </Button>
            ) : (
                <Button
                    type="primary"
                    block
                    disabled={!size}
                    icon={<PlusOutlined />}
                    onClick={addClickHandler}
                >
                    Добавить
                </Button>
            )} */}
        </div>
    )
}
export default CardProduct
