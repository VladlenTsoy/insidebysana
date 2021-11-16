import React, {useState} from "react"
import {CaretDownOutlined, PoweroffOutlined} from "@ant-design/icons"
import {Drawer, Dropdown, Menu} from "antd"
import {useUser} from "../../hooks/use-user"
import {useScreenWindow} from "../../hooks/use-screen-window.effect"
import styles from "./AccountMenu.module.less"
import ProfileItem from "../../pages/user/admin/layout/account-items/profile-item/ProfileItem"
import SettingsItem from "../../pages/user/admin/layout/account-items/settings-item/SettingsItem"
import cn from "classnames"
import ChatItem from "../header/sidebars/items/chat-item/ChatItem"
import NotificationsItem from "../header/sidebars/items/notifications-item/NotificationsItem"

const AccountMenu: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const {logout} = useUser()
    const [visible, setVisible] = useState(false)

    const toggle = (visible: boolean) => setVisible(visible)

    const menu = (
        <Menu>
            <Menu.Item className={styles.accountItem} key="profile">
                <ProfileItem />
            </Menu.Item>
            <Menu.Item className={styles.accountItem} key="settings">
                <SettingsItem />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                className={styles.accountItem}
                onClick={logout}
                key="exit"
            >
                <PoweroffOutlined /> Выход
            </Menu.Item>
        </Menu>
    )

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    if (isBreakpoint)
        return (
            <>
                <button
                    className={cn(styles.sidebarButton, {
                        [styles.active]: visible
                    })}
                    onClick={visible ? close : open}
                >
                    <CaretDownOutlined />
                </button>
                <Drawer
                    getContainer="#site-layout-content"
                    // style={{position: "absolute"}}
                    bodyStyle={{padding: 0}}
                    visible={visible}
                    closable={false}
                    mask={false}
                    onClose={close}
                    zIndex={4}
                >
                    {menu}
                </Drawer>
            </>
        )

    return (
        <div className={styles.buttons}>
            <ChatItem key="chat" />
            <NotificationsItem key="notifications" />
            <Dropdown
                onVisibleChange={toggle}
                overlay={menu}
                arrow
                placement="bottomRight"
            >
                <button
                    className={cn(styles.sidebarButton, {
                        [styles.active]: visible
                    })}
                >
                    <CaretDownOutlined />
                </button>
            </Dropdown>
        </div>
    )
}

export default AccountMenu
