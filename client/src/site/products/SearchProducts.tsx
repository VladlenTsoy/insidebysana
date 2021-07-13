import React from "react"
import Title from "components/title/Title"
import GridClothesCard from "components/grid-clothes-card/GridClothesCard"
import LoaderBlock from "components/loader-block/LoaderBlock"
import EmptyBlock from "components/empty-block/EmptyBlock"
import ClothesCard from "components/clothes-card/ClothesCard"
import styled from "./SearchProducts.module.css"
import Input from "components/input/Input"
import SearchOutlined from "@ant-design/icons/SearchOutlined"
import {useGetProductsBySearchMutation} from "./productApi"

const Search = () => {
    const [searchProducts, {data: products = [], isLoading}] = useGetProductsBySearchMutation()
    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (e.target.value.trim() !== "") searchProducts(e.target.value)
        }, 500)
    }

    return (
        <>
            <Title level={1}>Поиск</Title>
            <div className={styled.searchInput}>
                <Input onChange={onChangeHandler} placeholder="Поиск..." />
                <SearchOutlined />
            </div>
            {isLoading ? (
                <LoaderBlock />
            ) : !products.length ? (
                <EmptyBlock />
            ) : (
                <GridClothesCard>
                    {products.map(product => (
                        <ClothesCard product={product} key={product.id} />
                    ))}
                </GridClothesCard>
            )}
        </>
    )
}

export default React.memo(Search)
