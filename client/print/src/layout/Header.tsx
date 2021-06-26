import React from "react"
import {Layout} from "antd"
import LogoImagePng from "./logo.png"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"

const Header: React.FC = () => {
    const history = useHistory()

    const clickHandler = () => history.push("/")

    return (
        <Layout.Header className="header">
            <div className="logo" onClick={clickHandler}>
                <picture>
                    <img src={LogoImagePng} alt="Flowers" />
                </picture>
            </div>
            <div className="navbar">
                <nav className="navbar-right">
                    <li>
                        <ShoppingCartOutlined />
                        Корзина
                    </li>
                </nav>
            </div>
        </Layout.Header>
    )
}
export default Header
