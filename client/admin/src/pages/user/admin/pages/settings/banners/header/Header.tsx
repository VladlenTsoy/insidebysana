import React from "react"
import EditorBannerAction from "./editor-banner-action/EditorBannerAction"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"

const Header = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <EditorBannerAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Создать баннер
                    </Button>
                </EditorBannerAction>
            </div>
        </div>
    )
}

export default Header
