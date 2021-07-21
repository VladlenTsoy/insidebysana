import React from "react"
import styled from "./FeaturedProducts.module.css"
import {ProductColor} from "types/productColor"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Title from "components/title/Title"
import "pure-react-carousel/dist/react-carousel.es.css"
import Carousel from "./Carousel"
import {useGetFeaturedProductsByIdQuery} from "site/products/productApi"

interface RecommendedProps {
    productId: ProductColor["id"]
}

const FeaturedProducts: React.FC<RecommendedProps> = ({productId}) => {
    const {data: products = [], isLoading, isFetching} = useGetFeaturedProductsByIdQuery(productId)

    if (isLoading || isFetching) return <LoaderBlock />

    if (!products.length) return <></>

    return (
        <div className={styled.featuredProducts} id="featured-products">
            <Title level={3}>Вам также может понравиться</Title>
            <Carousel products={products} />
        </div>
    )
}

export default FeaturedProducts
