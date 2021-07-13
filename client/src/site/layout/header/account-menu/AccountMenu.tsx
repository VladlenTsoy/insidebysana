import React from "react"
import styled from "./AccountMenu.module.css"
import {Link} from "react-router-dom"
import UserOutlined from "@ant-design/icons/UserOutlined"
import SearchOutlined from "@ant-design/icons/SearchOutlined"
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined"
import ShoppingFilled from "@ant-design/icons/ShoppingFilled"
import HeartOutlined from "@ant-design/icons/HeartOutlined"
import HeartFilled from "@ant-design/icons/HeartFilled"
// import {useSelector} from "react-redux"
// import {wishlistSelector} from "../../../store/wishlist/wishlistSlice"
// import {useSelectAllSkuCart} from "../../../store/cart/cartSelector"

const AccountMenu = () => {
    // const cartSkus = useSelectAllSkuCart()
    const cartSkus = []
    // const wishlist = useSelector(wishlistSelector)
    const wishlist = {items: []}

    return (
        <div className={styled.accountMenu}>
            <menu>
                <li>
                    <Link to="/account">
                        <UserOutlined />
                    </Link>
                </li>
                <li>
                    <Link to="/search">
                        <SearchOutlined />
                    </Link>
                </li>
                <li>
                    <Link to="/wishlist" className={styled.wishlist}>
                        {wishlist.items.length ? (
                            <>
                                <HeartFilled />
                                <span className={styled.badge}>{wishlist.items.length}</span>
                            </>
                        ) : (
                            <HeartOutlined />
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className={styled.cart}>
                        {cartSkus.length ? (
                            <>
                                <ShoppingFilled />
                                <span className={styled.badge}>{cartSkus.length}</span>
                            </>
                        ) : (
                            <ShoppingOutlined />
                        )}
                    </Link>
                </li>
            </menu>
        </div>
    )
}

export default AccountMenu
