import React, {useEffect, useState} from "react"
import styled from "./FeaturedProducts.module.css"
import {useDispatch} from "../../../../store/store"
import {ProductColor, ProductColorCard} from "../../../../types/productColor"
import LoaderBlock from "../../../../components/loader-block/LoaderBlock"
import Title from "../../../../components/title/Title"
import {apiRequest} from "../../../../utils/api"
import "pure-react-carousel/dist/react-carousel.es.css"
import Carousel from "../carousel/Carousel"

interface RecommendedProps {
    productId: ProductColor["id"]
}

const FeaturedProducts: React.FC<RecommendedProps> = ({productId}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<ProductColorCard[]>([])

    useEffect(() => {
        apiRequest("get", `featured-products/${productId}`, {type: "guest"})
            .then((response) => {
                setProducts(response)
                setLoading(false)
            })
    }, [productId, dispatch])

    if (loading)
        return <LoaderBlock />

    if (!products.length)
        return <></>

    return (
        <div className={styled.featuredProducts} id="featured-products">
            <Title level={3}>Вам также может понравиться</Title>
            <Carousel products={products}/>
        </div>
    )
}

export default FeaturedProducts