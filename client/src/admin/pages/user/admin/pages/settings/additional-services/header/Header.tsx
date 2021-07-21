import {PlusOutlined} from "@ant-design/icons"
import {Button} from "antd"
import EditorAdditionalServiceAction from "admin/lib/components/editors/editor-additional-service-action/EditorAdditionalServiceAction"
import React from "react"

const Header: React.FC = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorAdditionalServiceAction>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Добавить доп. услугу
                    </Button>
                </EditorAdditionalServiceAction>
            </div>
        </div>
    )
}
export default Header
