import React from "react"
import styled from "./Products.module.css"
import ImageBlock from "components/image-block/ImageBlock"
import {formatPrice} from "utils/formatPrice"
import {useSelectAllProductCart} from "../../../../cartSlice"

const Products = () => {
    const products = useSelectAllProductCart()

    return (
        <div className={styled.products}>
            {products.map((product: any) => (
                <div className={styled.product} key={product.sku}>
                    <div className={styled.image}>
                        <ImageBlock src={product.url_thumbnail} alt={product.title} />
                    </div>
                    <div className={styled.info}>
                        <div className={styled.title}>
                            {product.title}
                        </div>
                        <div className={styled.size}>{product.size.title}</div>
                    </div>
                    <div className={styled.price}>
                        {product.discount && (
                            <div className={styled.discount}>
                                <span className={styled.oldPrice}>
                                    {formatPrice(product.price * product.qty)}
                                </span>{" "}
                                -{" "}
                                <span className={styled.priceDiscount}>
                                    {Math.ceil(product.discount.discount)}%
                                </span>
                            </div>
                        )}
                        <div className={styled.totalPrice}>
                            {formatPrice(product.price * product.qty, product.discount)} сум
                        </div>
                        <div className={styled.qty}>
                            <span>кол-во:</span> {product.qty}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default React.memo(Products)
