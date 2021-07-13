import React from "react"
import AccountMenu from "./account-menu/AccountMenu"
import Navigation from "./navigation/Navigation"
// import {useDispatch} from "../../store/store"
// import {fetchCategories} from "../../store/category/fetchCategories"
import Logo from "./logo/Logo"
import HeaderAnimation from "./HeaderAnimation"
// import {fetchUser} from "../../store/user/fetchUser"
// import {useSelector} from "react-redux"
// import {userSelector} from "../../store/user/userSlice"

const Header: React.FC = () => {
    // const {token} = useSelector(userSelector)
    // const dispatch = useDispatch()

    // Загрузка категорий
    // useEffect(() => {
    //     const promise = dispatch(fetchCategories())
    //     return () => {
    //         promise.abort()
    //     }
    // }, [dispatch])

    // // Загрузка пользователя
    // useEffect(() => {
    //     if (token) {
    //         const promise = dispatch(fetchUser())
    //         return () => {
    //             promise.abort()
    //         }
    //     }
    // }, [dispatch, token])

    return (
        <HeaderAnimation>
            <Logo />
            <Navigation />
            <AccountMenu />
        </HeaderAnimation>
    )
}

export default Header
