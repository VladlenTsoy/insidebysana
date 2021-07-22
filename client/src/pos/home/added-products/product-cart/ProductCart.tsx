import {Badge, Button, Tag, Typography} from "antd"
import React, {useCallback} from "react"
import {removeFromCart, updateQty} from "../../posSlice"
import {useDispatch} from "../../..//store"
import {ProductColorCart} from "types/cashier/PosProductColor"
// import TagSize from "components/editors/editor-order-action/editor-order/order-products/tab-added-products/tag-size/TagSize"
import PriceBlock from "components/blocks/price-block/PriceBlock"
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons"
import "./ProductCart.less"
import TagSize from "admin/lib/components/editors/editor-order-action/editor-order/order-products/tab-added-products/tag-size/TagSize"

interface PlusMinusInputProps {
    max: number
    value: number
    min: number
    onChange: any
}

const PlusMinusInput: React.FC<PlusMinusInputProps> = ({value}) => {
    return (
        <div className="plus-minus-input">
            <div className="minus">
                <MinusOutlined />
            </div>
            <div className="count">{value}</div>
            <div className="plus">
                <PlusOutlined />
            </div>
        </div>
    )
}

interface ProductCartProps {
    product: ProductColorCart
}

const ProductCart: React.FC<ProductCartProps> = ({product}) => {
    const dispatch = useDispatch()

    // Обновить кол-во в продукта в корзине
    const updateProductQty = useCallback(
        (value: any) =>
            dispatch(
                updateQty({size_id: product.size_id, product_color_id: product.product_color_id, qty: value})
            ),
        [dispatch, product]
    )

    // Удалить продукт
    const deleteProduct = useCallback(
        () =>
            dispatch(removeFromCart({size_id: product.size_id, product_color_id: product.product_color_id})),
        [dispatch, product]
    )

    return (
        <div className="cart-product-item">
            <div className="details">
                <div className="title">
                    {product.product.details.title} ({product.product.color.title})
                </div>
                {/* <div className="size-qty">
                    XS (12)
                </div> */}
                <div className="price-size">
                    <PriceBlock price={product.product.details.price} discount={product.product.discount} />
                    <Tag color="#fe9c64">XS (12)</Tag>
                </div>
            </div>
            <div>
                <PlusMinusInput
                    max={product.product.sizes[product.size_id].qty}
                    onChange={updateProductQty}
                    value={product.qty}
                    min={1}
                />
            </div>
        </div>
    )
}
export default ProductCart
