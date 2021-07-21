import React from "react"
import ProfileItem from "./profile-item/ProfileItem"
import SettingsItem from "./settings-item/SettingsItem"
import { Menu } from "antd";

const AccountItems = [
    <Menu.Item className="account-item" key="profile">
        <ProfileItem/>
    </Menu.Item>,
    <Menu.Item className="account-item" key="settings">
        <SettingsItem/>
    </Menu.Item>,
]

export default AccountItems