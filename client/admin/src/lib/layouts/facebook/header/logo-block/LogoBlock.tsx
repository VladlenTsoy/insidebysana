import React from "react"
// import {Logo} from "lib/ui"
import HeaderProfile from "./profile/HeaderProfile"
import './LogoBlock.less'

const LogoBlock = () => {
    return (
        <div className="layout-logo">
            <div className="logo">
                {/*<Logo to="/" />*/}
            </div>
            <div className="profile">
                <HeaderProfile />
            </div>
        </div>
    )
}

export default LogoBlock
