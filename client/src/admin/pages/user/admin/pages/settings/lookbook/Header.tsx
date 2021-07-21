import React from "react"
import {Button, Menu, Dropdown} from "antd"
import {PlusOutlined, DownOutlined} from "@ant-design/icons"
import EditorLookbookAction from "../../../../../../lib/components/editors/editor-lookbook-action/EditorLookbookAction"
import EditorLookbookCategoryAction from "admin/lib/components/editors/editor-lookbook-category-action/EditorLookbookCategoryAction"

const menu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorLookbookCategoryAction>
                <span>Категорию</span>
            </EditorLookbookCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorLookbookAction>
                <span>Lookbook</span>
            </EditorLookbookAction>
        </Menu.Item>
    </Menu>
)

const Header: React.FC = () => {
    return (
        <div className="header-actions">
            <div className="left">
                <Dropdown overlay={menu}>
                    <Button type="primary" size="large">
                        Создать <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}

export default Header
