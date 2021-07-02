import React from "react"
import {Layout, Button, Badge} from "antd"
import LogoImagePng from "./logo.png"
import {LeftOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {Link, useHistory, useLocation} from "react-router-dom"
import {useSelectAllSkuCart} from "cart/cartSlice"

const Header: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const skus = useSelectAllSkuCart()

    const clickHandler = () => history.push("/")
    const back = () => history.goBack()

    return (
        <Layout.Header className="header">
            <div className="logo" onClick={clickHandler}>
                <picture>
                    <img src={LogoImagePng} alt="Flowers" />
                </picture>
            </div>
            {location.pathname !== "/" && (
                <div className="back-button">
                    <Button icon={<LeftOutlined />} size="large" onClick={back}>
                        Вернуться назад
                    </Button>
                </div>
            )}
            <div className="navbar">
                <nav className="navbar-right">
                    <li>
                        <Badge count={skus.length}>
                            <Link to="/cart">
                                <ShoppingCartOutlined />
                                Корзина
                            </Link>
                        </Badge>
                    </li>
                </nav>
            </div>
        </Layout.Header>
    )
}
export default Header
