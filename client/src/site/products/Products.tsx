import React from "react"
import Title from "../../components/title/Title"
import ClothesCard from "../../components/clothes-card/ClothesCard"
import {useParams} from "react-router-dom"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import EmptyBlock from "../../components/empty-block/EmptyBlock"
import {useLoadingProducts, useSelectAllProducts} from "./productSlice"
import GridClothesCard from "../../components/grid-clothes-card/GridClothesCard"
import FilterSort from "./filter-sort/FilterSort"
import {useGetCategoryById} from "site/layout/header/navigation/nav-desktop/products-menu/categories-menu/categoryApi"

export interface ProductsParamsProps {
    id?: string
}

const Products = () => {
    const loading = useLoadingProducts()
    const products = useSelectAllProducts()
    const params = useParams<ProductsParamsProps>()
    const {category, isLoading} = useGetCategoryById(Number(params.id))

    return (
        <div>
            <Title level={1}>{isLoading ? "Загрузка..." : category?.title || "Новинки"}</Title>
            <FilterSort />
            {loading ? (
                <LoaderBlock key="product-loading" />
            ) : products.length ? (
                <GridClothesCard>
                    {products.map(product => (
                        <ClothesCard
                            product={product}
                            key={`${params?.id} 
                                    ${product.id}`}
                        />
                    ))}
                </GridClothesCard>
            ) : (
                <EmptyBlock />
            )}
        </div>
    )
}

export default Products
