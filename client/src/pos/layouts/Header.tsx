import {SearchOutlined} from "@ant-design/icons"
import {Input} from "antd"
import {fetchProductColorBySearch} from "pos/home/fetchProductColorBySearch"
import {useCategoryIdPos, useSizeIdPos} from "pos/home/posSelectors"
import React, {useEffect, useState} from "react"
import {useDispatch} from "../store"
import FilterButton from "./FilterButton"
import "./Header.less"

const Header: React.FC = () => {
    const dispatch = useDispatch()

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
        <div className="header">
            <div className="logo"></div>
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
        </div>
    )
}
export default Header
