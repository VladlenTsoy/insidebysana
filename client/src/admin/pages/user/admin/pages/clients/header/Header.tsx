import React from "react"
import {Button, Input} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import EditorClientAction from "../../../../../../lib/components/editors/editor-client-action/EditorClientAction"

const {Search} = Input

interface HeaderProps {
    setSearch: any
}

const Header: React.FC<HeaderProps> = ({setSearch}) => {
    const onSearchHandler = (value: string) => {
        setSearch(value)
    }

    return (
        <div className="header-actions">
            <div className="left">
                <Search placeholder="Введите имя" allowClear enterButton="Поиск" size="large" onSearch={onSearchHandler}/>
            </div>
            <div className="right">
                <EditorClientAction>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Создать клиента
                    </Button>
                </EditorClientAction>
            </div>
        </div>
    )
}

export default Header
