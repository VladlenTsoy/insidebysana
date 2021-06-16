import React, {useEffect} from "react"
import styled from "./Product.module.css"
import {useParams} from "react-router-dom"
import {useDispatch} from "../../store/store"
import {fetchProductById} from "../../store/product/fetchProductById"
import {useLoadingProduct, useSelectProductById} from "../../store/product/productSelector"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import Details from "./details/Details"
import SlidersProperties from "./sliders-properties/SlidersProperties"
import FeaturedProducts from "./featured-and-recent/featured-products/FeaturedProducts"
import RecentProducts from "./featured-and-recent/recent-products/RecentProducts"

export interface ProductParamsProps {
    id: string
}

const Product = () => {
    const params = useParams<ProductParamsProps>()
    const dispatch = useDispatch()
    const product = useSelectProductById(Number(params.id))
    const loading = useLoadingProduct()

    useEffect(() => {
        const promise = dispatch(fetchProductById(params.id))
        return () => {
            promise.abort()
        }
    }, [dispatch, params.id])

    if (loading || !product)
        return <LoaderBlock />

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