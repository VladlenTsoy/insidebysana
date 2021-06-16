import {Empty} from "antd"
import {LoadingBlock} from "lib/ui"
import React from "react"
import CardProduct from "./card-product/CardProduct"

interface GridProductsProps {
    products: any[]
    loading: boolean
}

const GridProducts: React.FC<GridProductsProps> = ({loading, products}) => {
    if (loading) return <LoadingBlock />

    if (!products.length) return <Empty />

    return (
        <div className="products-container">
            {products.map(product => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>
    )
}
export default GridProducts
