import React from "react"

interface DetailsProps {
    title: string
    product: any
}

const Details: React.FC<DetailsProps> = ({title, product}) => {
    return (
        <div className="title-block">
            <div className="title">
                {title}
                {product.is_new && <div className="is-new">new</div>}
            </div>
            <div className="color-hex-block">
                <div className="color-hex-circle" style={{background: product.color.hex}} />
                {product.color.title}
            </div>
        </div>
    )
}
export default Details
