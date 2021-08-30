import React, {useState} from "react"
import {BellFilled} from "@ant-design/icons"

const NotificationsItem = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <div>
            <button
                className={`layout-sidebar-button ${visible ? "active" : ""}`}
                onClick={visible ? close : open}
            >
                <BellFilled />
            </button>
        </div>
    )
}

export default NotificationsItem
