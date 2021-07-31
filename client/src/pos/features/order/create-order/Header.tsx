import React from "react"
import {ArrowLeftOutlined} from "@ant-design/icons"

interface HeaderProps {
    close: () => void
}

const Header: React.FC<HeaderProps> = ({close}) => {
    return (
        <div className="header">
            <div>Завершить заказ</div>
            <div className="back" onClick={close}>
                <ArrowLeftOutlined />
                Назад
            </div>
        </div>
    )
}
export default React.memo<HeaderProps>(Header)
