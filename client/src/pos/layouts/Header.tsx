import {MenuOutlined, SearchOutlined, SkinFilled, DollarCircleFilled} from "@ant-design/icons"
import {Button, Input, Dropdown, Menu} from "antd"
import {fetchProductColorBySearch} from "pos/features/product/fetchProductColorBySearch"
import {useCategoryIdPos, useProductPaginationPos, useSizeIdPos} from "pos/features/product/productSlice"
import React, {useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {useDispatch} from "../store"
import FilterButton from "./FilterButton"
import "./Header.less"
import Navigation from "./Navigation"

const MenuSidebar: React.FC = () => {
    const {pathname} = useLocation()

    const menu = (
        <Menu selectedKeys={[pathname]}>
            <Menu.Item className="account-item" icon={<SkinFilled />} key="/">
                <Link to="/">Товары</Link>
            </Menu.Item>
            <Menu.Item className="account-item" icon={<DollarCircleFilled />} key="/orders">
                <Link to="/orders">Сделки</Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="logo">
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button icon={<MenuOutlined />} size="large" />
            </Dropdown>
        </div>
    )
}

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
            <MenuSidebar />
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
