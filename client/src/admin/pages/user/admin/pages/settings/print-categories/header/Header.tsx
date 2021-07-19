import React from "react"
import {Dropdown, Button, Menu} from "antd"
import {PlusOutlined, DownOutlined} from "@ant-design/icons"
import EditorPrintCategoryAction from "admin/lib/components/editors/editor-print-category-action/EditorPrintCategoryAction"

const menu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorPrintCategoryAction>
                <span>Категорию</span>
            </EditorPrintCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorPrintCategoryAction sub>
                <span>Подкатегорию</span>
            </EditorPrintCategoryAction>
        </Menu.Item>
    </Menu>
)

const Header = () => {
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
