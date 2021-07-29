import {MenuOutlined, SearchOutlined, SkinFilled, DollarCircleFilled} from "@ant-design/icons"
import {Button, Input, Dropdown, Menu} from "antd"
import {changeSearch} from "pos/features/product/productSlice"
import React from "react"
import {Link, useLocation} from "react-router-dom"
import {useDispatch} from "pos/store"
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
    let timeout: any

    const onChangeHandler = (e: any) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(changeSearch(e.target.value))
        }, 500)
    }

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
                    allowClear
                    placeholder="Введите SKU или название товара"
                />
            </div>
            <Navigation />
        </div>
    )
}
export default Header
