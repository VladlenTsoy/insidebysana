import {useScreenSize} from "hooks/useScreenSize"
import ImageLink from "../../../cart/cart-products/cart-product-column/image-link/ImageLink"
import {OrderMore} from "../../Order"
import React from "react"
import {Link} from "react-router-dom"
import {formatPrice} from "utils/formatPrice"
import styled from "./ProductItem.module.css"

interface ProductItemProps {
    product: OrderMore["productColors"][0]
}

const ProductItem: React.FC<ProductItemProps> = ({product}) => {
    const {width} = useScreenSize()

    return (
        <div key={product.id} className={styled.wrapper}>
            <div className={styled.left}>
                <ImageLink image={product.url_thumbnail} id={product.id} />
                <div className={styled.details}>
                    <Link to={`/product/${product.id}`} className={styled.title}>
                        {product.title} ({product.color_title})
                    </Link>
                    <div className={styled.properties}>
                        <span className={styled.property_title}>Размер: </span>
                        <span>{product.size_title}</span>
                        {width < 767 && (
                            <>
                                <span className={styled.property_title}>Кол-во: </span>
                                <span>{product.qty}</span>
                                <span className={styled.property_title}>Цена: </span>
                                <span>{formatPrice(product.qty * product.price)} сум</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {width > 767 && (
                <>
                    <div className={styled.qty}>{product.qty}</div>
                    <div className={styled.price}>{formatPrice(product.qty * product.price)} сум</div>
                </>
            )}
        </div>
    )
}
export default ProductItem
