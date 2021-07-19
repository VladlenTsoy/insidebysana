import {Button, Typography} from "antd"
import React, {useCallback} from "react"
import {removeFromCart, updateQty} from "admin/store/cashier/pos/posSlice"
import {useCashierDispatch} from "admin/store/cashier/store"
import {ProductColorCart} from "admin/lib/types/cashier/PosProductColor"
// import ImageBlock from "admin/lib/components/blocks/image-block/ImageBlock"
import TagSize from "admin/lib/components/editors/editor-order-action/editor-order/order-products/tab-added-products/tag-size/TagSize"
import PriceBlock from "admin/lib/components/blocks/price-block/PriceBlock"
import InputPlusMinus from "admin/lib/components/form/input-plus-minus/InputPlusMinus"
import {DeleteOutlined} from "@ant-design/icons"

const {Title} = Typography

interface ProductCartProps {
    product: ProductColorCart
}

const ProductCart: React.FC<ProductCartProps> = ({product}) => {
    const dispatch = useCashierDispatch()

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
            {/* <ImageBlock image={product.product.url_thumbnail} /> */}
            <div>
                <Title level={5}>
                    {product.product.details.title} ({product.product.color.title})
                </Title>
                <div className="size-qty">
                    <TagSize sizeId={product.size_id} /> ({product.product.sizes[product.size_id].qty})
                </div>
                <div>
                    <PriceBlock price={product.product.details.price} discount={product.product.discount} />
                </div>
            </div>
            <div>
                <InputPlusMinus
                    max={product.product.sizes[product.size_id].qty}
                    onChange={updateProductQty}
                    value={product.qty}
                    min={1}
                />
            </div>
            <div>
                <Button size="large" danger onClick={deleteProduct} icon={<DeleteOutlined />} />
            </div>
        </div>
    )
}
export default ProductCart
