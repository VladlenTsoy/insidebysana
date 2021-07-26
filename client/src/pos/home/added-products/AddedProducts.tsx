import React from "react"
import {useSelectAllPosProductColors} from "../posSelectors"
import ActionsBlock from "./actions-block/ActionsBlock"
import ProductCart from "./ProductCart"
import "./AddedProducts.less"

interface AddedProductsProps {}

const AddedProducts: React.FC<AddedProductsProps> = () => {
    const products = useSelectAllPosProductColors()

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
