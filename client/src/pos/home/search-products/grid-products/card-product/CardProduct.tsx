import {DeleteFilled, PlusOutlined} from "@ant-design/icons"
import {Button, Radio, Typography} from "antd"
import ImageBlock from "components/blocks/image-block/ImageBlock"
import React, {useCallback, useState} from "react"
import {useGetSizeQuery} from "../../size-select/sizeApi"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {ProductColorCard} from "types/cashier/PosProductColor"
import {useDispatch} from "../../../../store"
import {addToCart, removeFromCart} from "../../../posSlice"
import {useSelectAllPosProductColors} from "../../../posSelectors"

const {Title} = Typography

interface CardProductProps {
    product: ProductColorCard
}

const CardProduct: React.FC<CardProductProps> = ({product}) => {
    const {data: sizes} = useGetSizeQuery()
    const [size, setSize] = useState<number | null>(null)
    const dispatch = useDispatch()
    const products = useSelectAllPosProductColors()

    // Добавить продукт
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

    return (
        <div className="product-card">
            <div className="wrap-details">
                <div className="thumbnail">
                    <ImageBlock image={product.url_thumbnail} />
                </div>
                <div className="details">
                    <Title level={5}>{`${product.details.title} (${product.color.title})`}</Title>
                    <div>
                        <PriceBlock price={product.details.price} discount={product.discount} />
                    </div>
                </div>
            </div>
            <div className="sizes-action">
                <Radio.Group onChange={onChangeHandler}>
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
            {isAdded ? (
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
            )}
        </div>
    )
}
export default CardProduct
