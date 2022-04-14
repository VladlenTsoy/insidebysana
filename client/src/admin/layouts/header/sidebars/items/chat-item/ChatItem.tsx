import React, {useEffect, useState} from "react"
import {MessageOutlined} from "@ant-design/icons"
import cn from "classnames"
import styles from "../../../../account-menu/AccountMenu.module.less"
import {Drawer, Badge} from "antd"
import FacebookChat from "../../../../../components/facebook-chat/FacebookChat"
import socket from "../../../../../utils/socket"

const ChatItem = () => {
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    useEffect(() => {
        socket.emit("check_count_new_messages")
        socket.on("count_new_messages", (data) => {
            setCount(data)
        })
        return () => {
            socket.off("count_new_messages")
        }
    }, [])

    return (
        <>
            <button
                className={cn(styles.sidebarButton, {
                    [styles.active]: visible
                })}
                onClick={visible ? close : open}
            >
                <Badge count={count} offset={[10, -10]}>
                    <MessageOutlined />
                </Badge>
            </button>
            <Drawer
                bodyStyle={{padding: "0rem", height: "100%"}}
                visible={visible}
                width={420}
                closable={false}
                mask={false}
                onClose={close}
                destroyOnClose
            >
                <FacebookChat close={close} />
            </Drawer>
        </>
    )
}

export default ChatItem
