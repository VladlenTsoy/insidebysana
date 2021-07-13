import React, {useCallback, useEffect, useState} from "react"
import Title from "components/title/Title"
import styled from "../featured-products/FeaturedProducts.module.css"
import {ProductColorCard} from "types/productColor"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Carousel from "../carousel/Carousel"
import {getCookie, setCookie} from "utils/cookie"
import {api} from "utils/api"

interface RecentProductsProps {
    productColorId: ProductColorCard["id"]
}

const RecentProducts: React.FC<RecentProductsProps> = ({productColorId}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getLocalRecent = useCallback(() => {
        return JSON.parse(getCookie("InsideBySana_Recent") || "[]")
    }, [])

    const setLocalRecent = useCallback((ids) => {
        setCookie("InsideBySana_Recent", JSON.stringify(ids), {expires: 7})
    }, [])

    useEffect(() => {
        const ids = getLocalRecent()
        const key = ids.indexOf(productColorId)

        if (key > -1)
            ids.splice(key, 1)

        ids.push(productColorId)
        setLocalRecent(ids)

        setLoading(true)
        api.guest.post("recent-products", {ids, productColorId})
            .then(response => {
                setProducts(response.data)
                setLoading(false)
            })
    }, [productColorId, setLocalRecent, getLocalRecent])

    if (loading)
        return <LoaderBlock />

    if (!products.length)
        return <></>

    return (
        <div className={styled.featuredProducts} id="recent-products">
            <Title level={3}>Недавно вы смотрели</Title>
            <Carousel products={products} />
        </div>
    )
}

export default RecentProducts