import React from "react"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import EditorPromoCodeAction
    from "../../../../../../../lib/components/editors/editor-promo-code-action/EditorPromoCodeAction"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorPromoCodeAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить промокод
                    </Button>
                </EditorPromoCodeAction>
            </div>
        </div>
    )
}

export default Header