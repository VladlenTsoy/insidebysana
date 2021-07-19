import React from "react"
import {UserOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"

const ProfileItem = () => {
    const history = useHistory()

    const toProfile = () => history.push("/profile")

    return (
        <div onClick={toProfile}>
            <UserOutlined /> Профиль
        </div>
    )
}

export default ProfileItem