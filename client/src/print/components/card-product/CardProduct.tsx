import ImageBlock from "print/components/image-block/ImageBlock"
import React from "react"
import {useHistory} from "react-router-dom"
import {formatPrice} from "utils/formatPrice"
import "./CardProduct.less"

interface CardProductProps {
    title: string
    image: string
    price: number
    link: string
}

const CardProduct: React.FC<CardProductProps> = ({title, image, price, link}) => {
    const history = useHistory()
    const clickHandler = () => history.push(link)

    return (
        <div className="card-product" onClick={clickHandler}>
            <div className="card-product-image">
                <ImageBlock src={image} alt={title} />
            </div>
            <div className="card-product-title">{title}</div>
            <div className="card-product-price">{formatPrice(price)} сум</div>
        </div>
    )
}
export default CardProduct
