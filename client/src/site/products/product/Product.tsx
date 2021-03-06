import React from "react"
import styled from "./Product.module.css"
import {useParams} from "react-router-dom"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Details from "./details/Details"
import SlidersProperties from "./sliders-properties/SlidersProperties"
import FeaturedProducts from "./featured-and-recent/FeaturedProducts"
import RecentProducts from "./featured-and-recent/RecentProducts"
import {useGetProductByIdQuery} from "../productApi"

export interface ProductParamsProps {
    id: string
}

const Product: React.FC = () => {
    const params = useParams<ProductParamsProps>()
    const {data: product, isLoading, isFetching} = useGetProductByIdQuery(params.id)

    if (isLoading || !product || isFetching) return <LoaderBlock />

    return (
        <>
            <div className={styled.product} id="product" key={params.id}>
                <SlidersProperties product={product} />
                <Details product={product} />
            </div>
            <FeaturedProducts productId={product.product_id} />
            <RecentProducts productColorId={Number(params.id)} />
        </>
    )
}

export default Product
