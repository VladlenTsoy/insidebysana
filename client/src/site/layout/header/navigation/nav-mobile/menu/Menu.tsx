import React from "react"
import styled from "./Menu.module.css"
import {Link} from "react-router-dom"
import Collapse, {Panel} from "rc-collapse"
import "rc-collapse/assets/index.css"
import motion from "utils/collapseMotionUtil"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import CategoriesMenu from "../../nav-desktop/products-menu/categories-menu/CategoriesMenu"

const expandIcon = ({isActive}: any) =>
    <LeftOutlined className={`${styled.icon} ${isActive && styled.active}`} />

interface MenuProps {

}

const Menu: React.FC<MenuProps> = () => {
    return (
        <div className={styled.menu}>
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li>
                    <Collapse openMotion={motion} className="menu-categories" expandIcon={expandIcon}>
                        <Panel header="Каталог" key="categories">
                            <div className={styled.categories}>
                                <Link to={`/products/all`}>Все</Link>
                                <CategoriesMenu />
                            </div>
                        </Panel>
                    </Collapse>
                </li>
                <li><Link to="/lookbook">LookBook</Link></li>
                <li><Link to="/about-us">О нас</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
            </ul>
        </div>
    )
}

export default Menu