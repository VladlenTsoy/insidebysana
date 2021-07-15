import React, {useEffect} from "react"
import AccountMenu from "./account-menu/AccountMenu"
import Navigation from "./navigation/Navigation"
import {useDispatch} from "../../store"
import Logo from "./logo/Logo"
import HeaderAnimation from "./HeaderAnimation"
import {fetchUser} from "../../auth/authApi"
import {useSelector} from "react-redux"
import {authSelector} from "../../auth/authSlice"
import {usePrefetch} from "./navigation/nav-desktop/products-menu/categories-menu/categoryApi"
import {fetchCart} from "site/cart/cartApi"
import {fetchWishlist} from "site/wishlist/wishlistApi"

const Header: React.FC = () => {
    const {token, detail} = useSelector(authSelector)
    const dispatch = useDispatch()
    const prefetchCategories = usePrefetch("getCategories")

    useEffect(() => {
        prefetchCategories(undefined)
    }, [prefetchCategories])

    // Загрузка пользователя
    useEffect(() => {
        if (token) {
            const promise = dispatch(fetchUser())
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, token])

    //
    useEffect(() => {
        const promiseCart = dispatch(fetchCart())
        const promiseWishlist = dispatch(fetchWishlist())
        return () => {
            promiseCart.abort()
            promiseWishlist.abort()
        }
    }, [detail, dispatch])

    return (
        <HeaderAnimation>
            <Logo />
            <Navigation />
            <AccountMenu />
        </HeaderAnimation>
    )
}

export default React.memo(Header)
