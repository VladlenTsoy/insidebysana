import {PlusOutlined} from "@ant-design/icons"
import {Button} from "antd"
import EditorSizeAction from "lib/components/editors/editor-size-action/EditorSizeAction"
import React from "react"

const Header: React.FC = () => {
    return (
        <>
            <div className="header-actions">
                <div className="left">
                    <EditorSizeAction>
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Добавить размер
                        </Button>
                    </EditorSizeAction>
                </div>
            </div>
        </>
    )
}
export default Header
