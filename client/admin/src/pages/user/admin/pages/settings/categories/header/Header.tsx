import React from "react"
import {Dropdown, Button, Menu} from "antd"
import {PlusOutlined, DownOutlined} from "@ant-design/icons"
import EditorCategoryAction from "../editor-category-action/EditorCategoryAction"

const menu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorCategoryAction>
                <span>Категорию</span>
            </EditorCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorCategoryAction sub>
                <span>Подкатегорию</span>
            </EditorCategoryAction>
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
