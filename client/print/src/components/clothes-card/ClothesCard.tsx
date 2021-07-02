import React from "react"
import styled from "./ClothesCard.module.css"
import {formatPrice} from "../../utils/formatPrice"
import {Link} from "react-router-dom"
import ImageBlock from "../image-block/ImageBlock"

interface ClothesCardProps {
    discount?: {
        discount: number
    }
    image: string
    title: string
    price: number
    link: string
    priceVisible?: boolean
}

const ClothesCard: React.FC<ClothesCardProps> = ({
    discount,
    image,
    title,
    price,
    link,
    priceVisible = false
}) => {
    return (
        <div className={`${styled.clothesCard} ${priceVisible && styled.visiblePrice}`}>
            <Link className={styled.imageBlock} to={link}>
                <div className={styled.image}>
                    {discount && <div className={styled.discount}>{discount.discount}%</div>}
                    <ImageBlock src={image} alt={title} />
                </div>
            </Link>
            <Link to={link} className={styled.title}>
                {title}
            </Link>
            <div className={styled.price}>
                {discount && <div className={styled.prevPrice}>{formatPrice(price)} сум</div>}
                <div className={styled.mainPrice}>{formatPrice(price, discount)} сум</div>
            </div>
        </div>
    )
}

export default ClothesCard
