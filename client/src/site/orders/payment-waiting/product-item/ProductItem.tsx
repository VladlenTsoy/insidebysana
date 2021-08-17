import {useScreenSize} from "hooks/useScreenSize"
import ImageLink from "../../../cart/cart-products/cart-product-column/image-link/ImageLink"
import {OrderMore} from "../../orderApi"
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
                <div className={styled.wrapperThumbnail}>
                    <div className={styled.thumbnail}>
                        <ImageLink image={product.url_thumbnail} id={product.id} />
                    </div>
                </div>
                <div className={styled.details}>
                    <Link to={`/product/${product.id}`} className={styled.title}>
                        {product.title} ({product.color_title})
                    </Link>
                    <div className={styled.properties}>
                        <p>
                            <span className={styled.property_title}>Размер: </span>
                            <span className={styled.property_desc}>{product.size_title}</span>
                            {width < 767 && (
                                <>
                                    <span className={styled.property_title}>Кол-во: </span>
                                    <span className={styled.property_desc}>{product.qty}</span>
                                </>
                            )}
                        </p>
                        {width < 767 && (
                            <>
                                <span className={styled.property_title}>Цена: </span>
                                <span className={styled.property_desc}>
                                    {formatPrice(product.qty * product.price)} сум
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {width > 767 && (
                <>
                    <div className={styled.qty}>{product.qty}</div>
                    <div className={styled.price}>
                        <div className={styled.dicount}>
                            <span className={styled.dicountPrice}>
                                {formatPrice(product.qty * product.price)}
                            </span>{" "}
                            - <span className={styled.percent}>{product.discount}%</span>
                        </div>
                        <div>{formatPrice(product.qty * product.price, product.discount)} сум</div>
                    </div>
                </>
            )}
        </div>
    )
}
export default ProductItem
