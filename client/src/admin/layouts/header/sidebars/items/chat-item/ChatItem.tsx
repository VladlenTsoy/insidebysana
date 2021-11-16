import React, {useState} from "react"
import {MessageOutlined} from "@ant-design/icons"
import cn from "classnames"
import styles from "../../../../account-menu/AccountMenu.module.less"

const ChatItem = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <div>
            <button
                className={cn(styles.sidebarButton, {
                    [styles.active]: visible
                })}
                onClick={visible ? close : open}
            >
                <MessageOutlined />
            </button>
        </div>
    )
}

export default ChatItem
