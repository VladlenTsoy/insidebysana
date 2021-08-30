import React from "react"
import {Button, ButtonProps, Dropdown, DropDownProps} from "antd"
import {MoreOutlined} from "@ant-design/icons"

interface MenuButtonProps {
    size?: ButtonProps["size"]
    overlay: DropDownProps["overlay"]
}

const MenuButton: React.FC<MenuButtonProps> = ({size = "middle", overlay}) => {
    return (
        <Dropdown overlay={overlay} placement="bottomLeft" arrow>
            <Button size={size} icon={<MoreOutlined />} shape="circle" type="text" />
        </Dropdown>
    )
}

export default MenuButton
