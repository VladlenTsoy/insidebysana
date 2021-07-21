import React, {useState} from "react"
import {CaretDownOutlined, PoweroffOutlined} from "@ant-design/icons"
import {Dropdown, Menu, Drawer} from "antd"
import {useUser} from "../../../../../../hooks/use-user"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import './AccountMenu.less'

// const AccountMenuDrawStyled = styled(Drawer)`
//     .ant-drawer-wrapper-body .ant-drawer-body {
//         padding: 0;
//     }
// `

const AccountMenu: React.FC = ({children}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const {logout} = useUser()
    const [visible, setVisible] = useState(false)

    const toggle = (visible: boolean) => setVisible(visible)

    const menu = (
        <Menu>
            {children}
            <Menu.Divider />
            <Menu.Item className="account-item" onClick={logout} key="exit">
                <PoweroffOutlined /> Выход
            </Menu.Item>
        </Menu>
    )

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    if (isBreakpoint)
        return (
            <div>
                <button
                    className={`layout-sidebar-button ${visible ? "active" : ""}`}
                    onClick={visible ? close : open}
                >
                    <CaretDownOutlined />
                </button>
                <Drawer
                    getContainer=".draw-container"
                    style={{position: "absolute"}}
                    visible={visible}
                    closable={false}
                    mask={false}
                    onClose={close}
                    zIndex={4}
                >
                    {menu}
                </Drawer>
            </div>
        )

    return (
        <div>
            <Dropdown
                onVisibleChange={toggle}
                overlay={menu}
                arrow
                placement="bottomRight"
                // trigger={["click"]}
            >
                <button className={`layout-sidebar-button ${visible ? "active" : ""}`}>
                    <CaretDownOutlined />
                </button>
            </Dropdown>
        </div>
    )
}

export default AccountMenu
