import React from "react"
import {useScreenSize} from "hooks/useScreenSize"
import NavDesktop from "./nav-desktop/NavDesktop"
import NavMobile from "./nav-mobile/NavMobile"

const Navigation: React.FC = () => {
    const {width} = useScreenSize()

    return (
        width > 1200 ? <NavDesktop/> : <NavMobile/>
    )
}

export default Navigation