import React from "react"
import {Button, Input} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import EditorStaffAction from "../../../../../../lib/components/editors/editor-staff-action/EditorStaffAction"

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
                <EditorStaffAction>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Создать пользователя
                    </Button>
                </EditorStaffAction>
            </div>
        </div>
    )
}

export default Header
