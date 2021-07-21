import React from "react"
import AccountMenu from "./account-menu/AccountMenu"
import './Sidebar.less'

interface SidebarsProps {
    accountMenu: React.ReactFragment[]
    sidebars: React.ReactFragment[]
}

const Sidebars: React.FC<SidebarsProps> = ({sidebars, accountMenu}) => {
    return (
        <div className="layout-sidebar">
            {sidebars}
            <AccountMenu key="account-menu">{accountMenu}</AccountMenu>
        </div>
    )
}

export default Sidebars
