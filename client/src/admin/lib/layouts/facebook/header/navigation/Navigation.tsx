import React from "react"
import {Link, useLocation} from "react-router-dom"
import {Tooltip} from "antd"
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect"
import './Navigation.less'

export interface NavigationItemProps {
    link: string
    title: string
    icon: React.ReactFragment
    iconActive: React.ReactFragment
}

interface NavigationProps {
    menu: NavigationItemProps[]
}

const Navigation: React.FC<NavigationProps> = ({menu}) => {
    const location = useLocation()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    const arr = location.pathname.split("/")
    arr.splice(0,1)

    const updateActive = (link: string) => {
        link = link.replace('/', '')
        return arr.includes(link)
    }

    return (
        <div className="layout-navigation">
            <nav>
                {menu.map((item) => (
                    <Tooltip
                        {...(isBreakpoint ? {visible: false} : {})}
                        placement="bottom"
                        title={item.title}
                        key={item.link}
                    >
                        <li className={updateActive(item.link) ? "active" : ""}>
                            <Link to={item.link}>
                                {updateActive(item.link)
                                    ? item.iconActive
                                    : item.icon}
                            </Link>
                        </li>
                    </Tooltip>
                ))}
            </nav>
        </div>
    )
}

export default React.memo(Navigation)
