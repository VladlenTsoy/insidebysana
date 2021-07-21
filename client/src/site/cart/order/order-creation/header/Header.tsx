import React from "react"
import styled from "./Header.module.css"
import Button from "../../../../../components/button/Button"
import LeftOutlined from "@ant-design/icons/LeftOutlined"

interface HeaderProps {
    onClose: any
}

const Header: React.FC<HeaderProps> = ({onClose}) => {
    return (
        <div className={styled.header}>
            <div className="backAction">
                <Button type="secondary" size="small" icon={<LeftOutlined />} link onClick={onClose}>
                    Вернуться к корзине
                </Button>
            </div>
            <h1>Оформление заказа</h1>
        </div>
    )
}

export default Header