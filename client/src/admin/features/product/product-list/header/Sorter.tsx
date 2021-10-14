import React from "react"
import {Button, Dropdown, Menu} from "antd"
import {SortAscendingOutlined, SortDescendingOutlined} from "@ant-design/icons"

const menu = (
    <Menu>
        <Menu.Item key="one" icon={<SortAscendingOutlined />}>
            Дата создания
        </Menu.Item>
        <Menu.Item key="two" icon={<SortDescendingOutlined />}>
            Название
        </Menu.Item>
        <Menu.Item key="three" icon={<SortDescendingOutlined />}>
            Цена
        </Menu.Item>
    </Menu>
)

const Sorter: React.FC = () => {
    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <Button type="text" size="large" icon={<SortAscendingOutlined />}>
                Дата создания
            </Button>
        </Dropdown>
    )
}
export default Sorter
