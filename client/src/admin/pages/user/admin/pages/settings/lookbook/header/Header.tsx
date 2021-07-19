import React from "react"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import EditorLookbookAction
    from "../../../../../../../lib/components/editors/editor-lookbook-action/EditorLookbookAction"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorLookbookAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить lookbook
                    </Button>
                </EditorLookbookAction>
            </div>
        </div>
    )
}

export default Header