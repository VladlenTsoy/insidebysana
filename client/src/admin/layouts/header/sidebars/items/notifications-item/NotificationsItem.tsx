import React, {useState} from "react"
import {BellFilled} from "@ant-design/icons"
import styles from "../../../../account-menu/AccountMenu.module.less"
import cn from "classnames"
import {Drawer} from "antd"

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
                bodyStyle={{padding: 0}}
                visible={visible}
                // closable={false}
                // mask={false}
                onClose={close}
            >

            </Drawer>
        </>
    )
}

export default NotificationsItem
