import React from "react"
import {Input} from "antd"

const {Search} = Input

interface HeaderProps {
    setSearch: any;
}

const Header: React.FC<HeaderProps> = ({setSearch}) => {
    const onSearchHandler = (value: string) => {
        setSearch(value)
    }

    return (
        <div className="header-actions">
            <div className="left">
                <Search
                    placeholder="Введите имя"
                    allowClear
                    enterButton="Поиск"
                    size="large"
                    onSearch={onSearchHandler}
                />
            </div>
            <div className="right"></div>
        </div>
    )
}

export default Header
