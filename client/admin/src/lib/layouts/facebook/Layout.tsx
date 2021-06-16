import React, {useEffect} from "react"
import Header from "./header/Header"
import {NavigationItemProps} from "./header/navigation/Navigation"
import Footer from "./footer/Footer"
import {useHistory} from "react-router-dom"
import {useScreenWindow} from "../../../hooks/use-screen-window.effect"
import "./Layout.less"
import {useCommonDispatch} from "../../../store/common/store"
import {changeTitle} from "store/common/app/appSlice"

const Titles: any = {
    "/": "Главная",
    "/orders": "Сделки",
    "/products": "Продукты",
    "/clients": "Клиенты",
    "/settings": "Настройки",
    "/staff": "Сотрудники",
    "/profile": "Профиль",
}

interface FacebookLayout {
    navigations: NavigationItemProps[]
    sidebars: React.ReactFragment[]
    accountMenu: React.ReactFragment[]
}

const Layout: React.FC<FacebookLayout> = ({children, navigations, sidebars, accountMenu}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})
    const history = useHistory()
    const dispatch = useCommonDispatch()

    useEffect(() => {
        if (history.listen) {
            const unListen = history.listen((location: any) => {
                if (Titles[location.pathname]) dispatch(changeTitle(Titles[location.pathname]))
            })
            if (Titles[history.location.pathname]) dispatch(changeTitle(Titles[history.location.pathname]))
            return () => {
                unListen()
            }
        }
    }, [history, dispatch])

    return (
        <div className="layout">
            <Header navigations={navigations} sidebars={sidebars} accountMenu={accountMenu} />
            <div id="container" className="draw-container layout-draw-container" />
            <div className={`layout-container`}>{children}</div>
            {isBreakpoint && <Footer navigations={navigations} />}
        </div>
    )
}

export default Layout
