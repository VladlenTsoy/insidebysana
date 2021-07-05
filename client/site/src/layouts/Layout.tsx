import React from "react"
import {useSelectAllSkuCart} from "store/cart/cartSelector"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import styled from "./Layout.module.css"
import ShoppingFilled from "@ant-design/icons/ShoppingFilled"
import {Link, useLocation} from "react-router-dom"

const Layout: React.FC = ({children}) => {
    const cartSkus = useSelectAllSkuCart()
    const location = useLocation()

    return (
        <div className={styled.layout}>
            <Header />
            {!!cartSkus.length && location.pathname !== "/cart" && (
                <div className={styled.wrapper}>
                    <div className={styled.cartWrapper}>
                        <Link to="/cart" className={styled.cart}>
                            <ShoppingFilled />
                            <span className={styled.badge}>{cartSkus.length}</span>
                        </Link>
                    </div>
                </div>
            )}
            {children}
            <Footer />
        </div>
    )
}
export default Layout
