import React from "react"
import Header from "./header/Header"
import styles from "./Layout.module.less"

const Layout: React.FC = ({children}) => {
    return (
        <div className={styles.cashier}>
            <Header />
            <div className={styles.container}>{children}</div>
        </div>
    )
}
export default Layout
