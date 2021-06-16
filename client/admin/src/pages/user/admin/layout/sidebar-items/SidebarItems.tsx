import React from "react";
import NotificationsItem
    from "../../../../../lib/layouts/facebook/header/sidebars/items/notifications-item/NotificationsItem"
import ChatItem from "../../../../../lib/layouts/facebook/header/sidebars/items/chat-item/ChatItem";

const SidebarItems = [
    <ChatItem key="chat" />,
    <NotificationsItem key="notifications" />,
]

export default SidebarItems;