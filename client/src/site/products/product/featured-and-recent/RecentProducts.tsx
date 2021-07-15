import React, {useCallback} from "react"
import Title from "components/title/Title"
import styled from "./FeaturedProducts.module.css"
import {ProductColorCard} from "types/productColor"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Carousel from "./Carousel"
import {getCookie, setCookie} from "utils/cookie"
import {useGetRecentProductsByIdQuery} from "site/products/productApi"

interface RecentProductsProps {
    productColorId: ProductColorCard["id"]
}

const RecentProducts: React.FC<RecentProductsProps> = ({productColorId}) => {
    const setLocalRecent = useCallback(ids => {
        setCookie("InsideBySana_Recent", JSON.stringify(ids), {expires: 7})
    }, [])

    const params = () => {
        const ids = JSON.parse(getCookie("InsideBySana_Recent") || "[]")
        const key = ids.indexOf(productColorId)
        if (key > -1) ids.splice(key, 1)
        ids.push(productColorId)
        setLocalRecent(ids)

        return {productColorId, ids}
    }

    const {data: products = [], isLoading, isFetching} = useGetRecentProductsByIdQuery(params())

    if (isLoading || isFetching) return <LoaderBlock />

    if (!products.length) return <></>

    return (
        <div className={styled.featuredProducts} id="recent-products">
            <Title level={3}>Недавно вы смотрели</Title>
            <Carousel products={products} />
        </div>
    )
}

export default RecentProducts
