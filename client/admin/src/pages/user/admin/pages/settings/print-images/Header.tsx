import Button from "antd/es/button"
import EditorPrintImageAction from "lib/components/editors/editor-print-image-action/EditorPrintImageAction"
import React from "react"
import {PlusOutlined} from "@ant-design/icons"

const Header: React.FC = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorPrintImageAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить картинку
                    </Button>
                </EditorPrintImageAction>
            </div>
        </div>
    )
}
export default Header
