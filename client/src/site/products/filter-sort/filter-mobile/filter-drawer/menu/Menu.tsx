import React from "react"
import styled from "../FilterDrawer.module.css"
import RightOutlined from "@ant-design/icons/RightOutlined"

interface MenuProps {
    setPage: any
}

const Menu: React.FC<MenuProps> = ({setPage}) => {
    return (
        <div className={styled.menu}>
            <div className={styled.item} onClick={() => setPage("categories")}>
                <span className={styled.titleItem}>Категории</span>
                <RightOutlined />
            </div>
            <div className={styled.item} onClick={() => setPage("sizes")}>
                <span className={styled.titleItem}>Размеры</span>
                <RightOutlined />
            </div>
            <div className={styled.item} onClick={() => setPage("colors")}>
                <span className={styled.titleItem}>Цвета</span>
                <RightOutlined />
            </div>
            <div className={styled.item} onClick={() => setPage("price")}>
                <span className={styled.titleItem}>Стоимость</span>
                <RightOutlined />
            </div>
        </div>
    )
}

export default Menu