import React from "react"
import styled from "./ClothesCard.module.css"
import {formatPrice} from "../../utils/formatPrice"
import {Link} from "react-router-dom"
import {ProductColorCard} from "types/productColor"
import ImageBlock from "../image-block/ImageBlock"

interface ClothesCardProps {
    product: ProductColorCard
    priceVisible?: boolean
}

const ClothesCard: React.FC<ClothesCardProps> = ({product, priceVisible = false}) => {
    return (
        <div className={`${styled.clothesCard} ${priceVisible && styled.visiblePrice}`}>
            <Link className={styled.imageBlock} to={`/product/${product.id}`}>
                <div className={styled.image}>
                    <div className={styled.tags}>
                        {product.discount && (
                            <div className={styled.discount}>{Math.ceil(product.discount.discount)}%</div>
                        )}
                        {!!product.is_new && <div className={styled.isNew}>New</div>}
                    </div>
                    <ImageBlock src={product.url_thumbnail} alt={product.title} />
                </div>
            </Link>
            <Link to={`/product/${product.id}`} className={styled.title}>
                {product.title}
            </Link>
            <div className={styled.price}>
                {product.discount && <div className={styled.prevPrice}>{formatPrice(product.price)} сум</div>}
                <div className={styled.mainPrice}>{formatPrice(product.price, product.discount)} сум</div>
            </div>
        </div>
    )
}

export default ClothesCard
