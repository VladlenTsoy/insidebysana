import React from "react"
import {useCartProductColors} from "pos/features/cart/cartSlice"
import ActionsBlock from "pos/home/added-products/actions-block/ActionsBlock"
import ProductCart from "./CartProductItem"
import "./CartProducts.less"

interface AddedProductsProps {}

const AddedProducts: React.FC<AddedProductsProps> = () => {
    const products = useCartProductColors()

    return (
        <div className="cart-container">
            <div className="asdasd">
                <div className="cart-scroll-products">
                    {products.map(product => (
                        <ProductCart
                            product={product}
                            key={`${product.product_color_id}${product.size_id}`}
                        />
                    ))}
                </div>
                <ActionsBlock />
            </div>
        </div>
    )
}
export default AddedProducts
