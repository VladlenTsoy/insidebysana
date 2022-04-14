import React, {useEffect} from "react"
import {Avatar, List} from "antd"
import {ChatProps} from "./facebookChatApi"
import {CloseOutlined, UserOutlined} from "@ant-design/icons"
import styles from "./ChatList.module.less"
import {formatTime} from "../../utils/formatDate"
import {useLoadingChat, useSelectAllChats} from "./facebookChatSlice"
import {useAdminDispatch} from "../../store"
import {fetchFacebookChats} from "./fetchFacebookChats"

interface ChatListProps {
    selectChat: (chat: ChatProps) => void
    close: () => void
}

const ChatList: React.FC<ChatListProps> = ({selectChat, close}) => {
    const isLoading = useLoadingChat()
    const chats = useSelectAllChats()
    const dispatch = useAdminDispatch()

    useEffect(() => {
        const promise = dispatch(fetchFacebookChats())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div className={styles.chat}>
            <div className={styles.head}>
                <div className={styles.back}>
                </div>
                <div className={styles.profile}>
                    Все чаты
                </div>
                <div className={styles.close} onClick={close}>
                    <CloseOutlined />
                </div>
            </div>
            <div className={styles.container}>
                <List
                    itemLayout="horizontal"
                    dataSource={chats}
                    loading={isLoading}
                    renderItem={item => (
                        <List.Item className={styles.chat} onClick={() => selectChat(item)}>
                            <List.Item.Meta
                                avatar={
                                    item.facebook_client ?
                                        <Avatar src={item.facebook_client.profilePic} size={50} /> :
                                        <Avatar icon={<UserOutlined />} size={50} />
                                }
                                title={
                                    <div className={styles.item}>
                                        <span
                                            className={styles.name}>{item.facebook_client?.name || "Неизвестный пользователь"}</span>
                                        <span
                                            className={styles.created}>{formatTime(item.last_message.created_at)}</span>
                                    </div>
                                }
                                description={
                                    <div className={styles.description}>
                                        <span className={styles.lastMessage}>{item.last_message.message}</span>
                                        {!!item.count_new_messages &&
                                            <span className={styles.count}>{item.count_new_messages}</span>
                                        }
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

export default ChatList
