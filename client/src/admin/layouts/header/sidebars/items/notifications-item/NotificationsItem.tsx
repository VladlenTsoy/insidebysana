import React, {useState} from "react"
import {BellFilled} from "@ant-design/icons"
import styles from "../../../../account-menu/AccountMenu.module.less"
import cn from "classnames"
import {Drawer} from "antd"
import Notification from "../../../../../components/notifications/Notification"

const NotificationsItem = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <button
                className={cn(styles.sidebarButton, {
                    [styles.active]: visible
                })}
                onClick={visible ? close : open}
            >
                <BellFilled />
            </button>
            <Drawer
                bodyStyle={{padding: "1rem"}}
                visible={visible}
                width={350}
                // getContainer="#site-layout-content"
                // closable={false}
                mask={false}
                // style={{position: "absolute"}}
                onClose={close}
            >
                <Notification />
            </Drawer>
        </>
    )
}

export default NotificationsItem
