import React, {useEffect, useState} from "react"
import styled from "./Header.module.css"
import {useHistory, useLocation} from "react-router-dom"
import {useScreenSize} from "hooks/useScreenSize"
import {useDispatch} from "../../store"
import {changeMobileMenuVisible} from "../appSlice"

const HeaderAnimation: React.FC = ({children}) => {
    const location = useLocation()
    const history = useHistory()
    const [isFixed, setIsFixed] = useState<boolean>(false)
    const [isHome, setIsHome] = useState(location.pathname === "/")
    const {width} = useScreenSize()
    const dispatch = useDispatch()

    // Анимация при наведении
    const onMouseEnterHandler = () => window.pageYOffset === 0 && width > 1200 && setIsFixed(true)

    // Анимация при отводе
    const onMouseLeaveHandler = () => window.pageYOffset === 0 && width > 1200 && setIsFixed(false)

    // Если на главной странице
    useEffect(() => setIsHome(location.pathname === "/"), [location])

    // Если скролл и на главной странице на верху фиксировать
    useEffect(() => {
        const listenToScroll = () => setIsFixed(window.pageYOffset > 1 && isHome)

        window.addEventListener("scroll", listenToScroll)
        return () => {
            window.removeEventListener("scroll", listenToScroll)
        }
    }, [isHome])

    // При переходе по ссылка на верх
    useEffect(() => {
        if (history.listen) {
            const unListen = history.listen(() => {
                window.scrollTo(0, 0)
                if (width < 1200) dispatch(changeMobileMenuVisible(false))
            })
            return () => {
                unListen()
            }
        }
    }, [history, width, dispatch])

    return (
        <header
            id="header"
            data-mode={isFixed || !isHome ? "fixed" : "static"}
            className={`${styled.header} ${isHome && styled.fixed}`}
        >
            <div
                className={`${styled.navBar}`}
                data-mode={isFixed || location.pathname !== "/" ? "fixed" : "static"}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                {children}
            </div>
            <div id="menu-products" />
        </header>
    )
}

export default HeaderAnimation
