import React from "react"
import Header from "./header/Header"
import "./Layout.less"

const Layout: React.FC = ({children}) => {
    return (
        <div className="cashier">
            <Header />
            <div className="container">{children}</div>
        </div>
    )
}
export default Layout
