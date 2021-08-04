import React from "react"
import {ArrowLeftOutlined, CloseOutlined} from "@ant-design/icons"

interface HeaderProps {
    close: () => void
}

const Header: React.FC<HeaderProps> = ({close}) => {
    return (
        <div className="header">
            <div className="back" onClick={close}>
                <ArrowLeftOutlined />
                Назад
            </div>
            <div className="title">Завершить заказ</div>
            <div className="close" onClick={close}>
                <CloseOutlined />
            </div>
        </div>
    )
}
export default React.memo<HeaderProps>(Header)
