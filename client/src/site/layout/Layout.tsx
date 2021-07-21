import React from "react"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import styled from "./Layout.module.css"

const Layout: React.FC = ({children}) => {
    return (
        <div className={styled.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default Layout
