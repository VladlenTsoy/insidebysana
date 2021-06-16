import React, {useEffect, useState} from "react"
import Title from "../../components/title/Title"
import GridClothesCard from "../../components/grid-clothes-card/GridClothesCard"
import LoaderBlock from "../../components/loader-block/LoaderBlock"
import EmptyBlock from "../../components/empty-block/EmptyBlock"
import ClothesCard from "../../components/clothes-card/ClothesCard"
import {ProductColorCard} from "../../types/productColor"
import {api} from "../../utils/api"
import axios from "axios"
import styled from "./Search.module.css"
import Input from "../../components/input/Input"
import SearchOutlined from "@ant-design/icons/SearchOutlined"


const Search = () => {
    const [products, setProducts] = useState<ProductColorCard[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSearch(e.target.value)
        }, 500)
    }

    useEffect(() => {
        const source = axios.CancelToken.source()
        if (search.trim() !== "") {
            (async () => {
                try {
                    setLoading(true)
                    const response = await api.guest.post("search-products", {search}, {cancelToken: source.token})
                    setProducts(response.data)
                    setLoading(false)
                } catch (e) {
                    console.error(e)
                    setProducts([])
                    setLoading(false)
                }
            })()
            return () => {
                source.cancel()
            }
        } else {
            setProducts([])
            setLoading(false)
        }
    }, [search])

    return (
        <>
            <Title level={1}>Поиск</Title>
            <div className={styled.searchInput}>
                <Input onChange={onChangeHandler} placeholder="Поиск..." />
                <SearchOutlined />
            </div>
            {
                loading ? <LoaderBlock /> :
                    !products.length ? <EmptyBlock /> :
                        <GridClothesCard>
                            {
                                products.map(product => <ClothesCard product={product} key={product.id} />)
                            }
                        </GridClothesCard>
            }
        </>
    )
}

export default React.memo(Search)