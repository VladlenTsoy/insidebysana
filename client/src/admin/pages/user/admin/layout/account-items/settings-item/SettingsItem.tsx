import React from "react"
import {useHistory} from "react-router-dom"
import {SettingOutlined} from "@ant-design/icons"

const SettingsItem = () => {
    const history = useHistory()

    const toProfile = () => history.push("/settings")

    return (
        <div onClick={toProfile}>
            <SettingOutlined /> Настройки
        </div>
    )
}

export default SettingsItem