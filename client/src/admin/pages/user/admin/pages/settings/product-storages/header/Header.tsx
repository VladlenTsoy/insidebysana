import React from "react"
import EditorProductStoragesAction from "../editor-product-storages-action/EditorProductStoragesAction"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorProductStoragesAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить место хранения
                    </Button>
                </EditorProductStoragesAction>
            </div>
        </div>
    )
}

export default Header
