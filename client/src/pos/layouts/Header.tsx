import {MenuOutlined, SearchOutlined} from "@ant-design/icons"
import {Button, Input} from "antd"
import {fetchProductColorBySearch} from "pos/features/product/fetchProductColorBySearch"
import {useCategoryIdPos, useProductPaginationPos, useSizeIdPos} from "pos/features/product/productSlice"
import React, {useEffect, useState} from "react"
import {useDispatch} from "../store"
import FilterButton from "./FilterButton"
import "./Header.less"
import Navigation from "./Navigation"

const Header: React.FC = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState<string>("")
    const categoryId = useCategoryIdPos()
    const sizeId = useSizeIdPos()
    const {currentPage} = useProductPaginationPos()

    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSearch(e.target.value)
        }, 500)
    }

    useEffect(() => {
        const promise = dispatch(fetchProductColorBySearch({search, categoryId, sizeId, currentPage}))
        return () => {
            promise.abort()
        }
    }, [search, dispatch, categoryId, sizeId, currentPage])

    return (
        <div className="header">
            <div className="logo">
                <Button icon={<MenuOutlined />} size="large" />
            </div>
            <div>
                <FilterButton />
            </div>
            <div className="search">
                <Input
                    suffix={<SearchOutlined />}
                    size="large"
                    onChange={onChangeHandler}
                    // ref={searchRef}
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <Navigation />
        </div>
    )
}
export default Header
