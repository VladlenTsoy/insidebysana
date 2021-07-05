import React from "react"
import Title from "../../components/title/Title"
import ClothesCard from "../../components/clothes-card/ClothesCard"
import {useParams} from "react-router-dom"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import EmptyBlock from "../../components/empty-block/EmptyBlock"
import {useLoadingProductCards, useSelectAllProductCards} from "../../store/product-card/productCardSelector"
import GridClothesCard from "../../components/grid-clothes-card/GridClothesCard"
import FilterSort from "./filter-sort/FilterSort"
import {useSelectCategoryById} from "store/category/categoriesSelector"

export interface ProductsParamsProps {
    id?: string
}

const Products = () => {
    const loading = useLoadingProductCards()
    const products = useSelectAllProductCards()
    const params = useParams<ProductsParamsProps>()
    const category = useSelectCategoryById(params.id || "0")

    return (
        <div>
            <Title level={1}>{category?.title || "Новинки"}</Title>
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
