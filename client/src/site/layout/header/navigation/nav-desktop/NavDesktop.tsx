import React, {useEffect, useState} from "react"
import styled from "./NavDesktop.module.css"
import {Link, useLocation} from "react-router-dom"
import ProductsMenu from "./products-menu/ProductsMenu"

const NavDesktop = () => {
    const location = useLocation()
    const [activeUrl, setActiveUrl] = useState(location.pathname)

    useEffect(() => {
        setActiveUrl(location.pathname)
    }, [location.pathname])

    return (
        <menu className={styled.navigation}>
            <li><Link className={activeUrl === "/" ? styled.active : ""} to="/">Главная</Link></li>
            <li>
                <ProductsMenu>
                    <Link
                        className={activeUrl.includes("product") ? styled.active : ""}
                        id="nav-products"
                        to="/products/all"
                    >
                        Каталог
                    </Link>
                </ProductsMenu>
            </li>
            <li><Link className={activeUrl === "/lookbook" ? styled.active : ""} to="/lookbook">LOOKBOOK</Link></li>
            <li><Link className={activeUrl === "/about-us" ? styled.active : ""} to="/about-us">О Нас</Link></li>
            <li><Link className={activeUrl === "/contacts" ? styled.active : ""} to="/contacts">Контакты</Link></li>
        </menu>
    )
}

export default NavDesktop