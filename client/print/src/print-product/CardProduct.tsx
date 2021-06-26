import ImageBlock from "components/image-block/ImageBlock"
import React from "react"
import {Link} from "react-router-dom"
import "./CardProduct.less"

interface CardProductProps {
    product: {
        id: number
        title: string
        url_thumbnail: string
    }
}

const CardProduct: React.FC<CardProductProps> = ({product}) => {
    return (
        <>
            <div className="card-product">
                <Link className="card-product-image" to={`/product/${product.id}`}>
                    <div className="image">
                        <ImageBlock src={product.url_thumbnail} alt={product.title} />
                    </div>
                </Link>
            </div>
        </>
    )
}
export default CardProduct
