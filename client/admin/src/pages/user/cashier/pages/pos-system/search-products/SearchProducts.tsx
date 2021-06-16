import {SearchOutlined} from "@ant-design/icons"
import {Input} from "antd"
import CategorySelect from "./category-select/CategorySelect"
import React, {useEffect, useState} from "react"
import {fetchProductColorBySearch} from "store/cashier/pos/fetchProductColorBySearch"
import {
    useCategoryIdPos,
    useLoadingPosProductColors,
    usePosProductColorCards,
    useSizeIdPos
} from "store/cashier/pos/posSelectors"
import {useCashierDispatch} from "store/cashier/store"
import GridProducts from "./grid-products/GridProducts"
import SizeSelect from "./size-select/SizeSelect"

interface SearchProductsProps {
    searchRef: any
}

const SearchProducts: React.FC<SearchProductsProps> = ({searchRef}) => {
    const dispatch = useCashierDispatch()
    const products = usePosProductColorCards()
    const loading = useLoadingPosProductColors()
    const [search, setSearch] = useState<string>("")
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()

    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSearch(e.target.value)
        }, 500)
    }

    useEffect(() => {
        const promise = dispatch(fetchProductColorBySearch({search, categoryId, sizeId}))
        return () => {
            promise.abort()
        }
    }, [search, dispatch, categoryId, sizeId])

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <CategorySelect />
                <SizeSelect />
                <Input
                    suffix={<SearchOutlined />}
                    size="large"
                    onChange={onChangeHandler}
                    ref={searchRef}
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <div className="products-wrapper">
                <GridProducts loading={loading} products={products} />
            </div>
        </div>
    )
}
export default SearchProducts
