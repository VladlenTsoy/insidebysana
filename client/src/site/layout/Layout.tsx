import React from "react"
import {useEffect} from "react"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import {usePrefetch} from "./header/navigation/nav-desktop/products-menu/categories-menu/categoryApi"
import styled from "./Layout.module.css"

const Layout: React.FC = ({children}) => {
    const prefetchCategories = usePrefetch("getCategories")

    useEffect(() => {
        prefetchCategories(undefined, {ifOlderThan: 3500})
    }, [prefetchCategories])

    return (
        <div className={styled.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default Layout
