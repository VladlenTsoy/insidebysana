import React, {useEffect} from "react"
import Title from "../../../components/title/Title"
import styled from "./NewProducts.module.css"
import {useLoadingNewProduct, useSelectAllNewProduct} from "../../../store/new-product/newProductSelector"
import {useDispatch} from "../../../store/store"
import {fetchNewProducts} from "../../../store/new-product/fetchNewProducts"
import ClothesCard from "../../../components/clothes-card/ClothesCard"
import LoaderBlock from "../../../components/loader-block/LoaderBlock"
import GridClothesCard from "../../../components/grid-clothes-card/GridClothesCard"

const NewProducts = () => {
    const loading = useLoadingNewProduct()
    const products = useSelectAllNewProduct()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchNewProducts())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div className={styled.newProducts}>
            <Title level={2}>Новинки</Title>
            {
                loading ?
                    <LoaderBlock/> :
                    <GridClothesCard>
                        {
                            products.map((product) =>
                                <ClothesCard product={product} key={product.id}/>
                            )
                        }
                    </GridClothesCard>
            }
        </div>
    )
}

export default NewProducts