import React, {useState} from "react"
import {MessageOutlined} from "@ant-design/icons"

const ChatItem = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <div>
            <button
                className={`layout-sidebar-button ${visible ? "active" : ""}`}
                onClick={visible ? close : open}
            >
                <MessageOutlined />
            </button>
        </div>
    )
}

export default ChatItem
