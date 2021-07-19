import React from "react"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import EditorColorAction from "../../../../../../../lib/components/editors/editor-color-action/EditorColorAction"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorColorAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить цвет
                    </Button>
                </EditorColorAction>
            </div>
        </div>
    )
}

export default Header