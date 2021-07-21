import React from "react"
import "./Footer.less"
import Navigation, {NavigationItemProps} from "../header/navigation/Navigation"

interface FooterProps {
    navigations: NavigationItemProps[]
}

const Footer: React.FC<FooterProps> = ({navigations}) => {
    return (
        <div className="layout-footer">
            <Navigation menu={navigations} />
        </div>
    )
}

export default Footer
