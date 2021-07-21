import React from "react"
import EditorSourceAction from "../editor-source-action/EditorSourceAction"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorSourceAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Создать ресурс
                    </Button>
                </EditorSourceAction>
            </div>
        </div>
    )
}

export default Header
