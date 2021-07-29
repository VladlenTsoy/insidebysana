import {
    BellFilled,
    CaretDownFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PoweroffOutlined
} from "@ant-design/icons"
import {Button, Menu, Dropdown} from "antd"
import React, {useState} from "react"
import "./Navigation.less"

const Navigation: React.FC = () => {
    const [fullScreen, setFullScreen] = useState(false)

    const requestFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setFullScreen(true)
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
            setFullScreen(false)
        }
    }

    const menu = (
        <Menu>
            <Menu.Item className="account-item" danger icon={<PoweroffOutlined />} key="/logout">
                Выйти
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="navigation">
            <Button
                icon={!fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
                size="large"
                onClick={requestFullScreen}
            />
            <Button icon={<BellFilled />} size="large" />
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button icon={<CaretDownFilled />} size="large" />
            </Dropdown>
        </div>
    )
}
export default Navigation
