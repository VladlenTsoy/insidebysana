import React from "react"
import Title from "components/title/Title"
import styled from "./NewProducts.module.css"
import ClothesCard from "components/clothes-card/ClothesCard"
import LoaderBlock from "components/loader-block/LoaderBlock"
import GridClothesCard from "components/grid-clothes-card/GridClothesCard"
import {useGetProductsLatestQuery} from "site/products/productApi"

const NewProducts: React.FC = () => {
    const {data: products = [], isLoading} = useGetProductsLatestQuery()

    return (
        <div className={styled.newProducts}>
            <Title level={2}>Новинки</Title>
            {isLoading ? (
                <LoaderBlock />
            ) : (
                <GridClothesCard>
                    {products.map(product => (
                        <ClothesCard product={product} key={product.id} />
                    ))}
                </GridClothesCard>
            )}
        </div>
    )
}

export default NewProducts
