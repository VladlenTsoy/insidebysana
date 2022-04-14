import React, {useEffect, useState} from "react"
import styles from "./ChatMore.module.less"
import {ArrowLeftOutlined, CloseOutlined, EyeFilled, SendOutlined} from "@ant-design/icons"
import {Button} from "antd"
import {ChatProps} from "./facebookChatApi"
import {formatTime} from "../../utils/formatDate"
import cn from "classnames"
import TextareaAutosize from "react-textarea-autosize"
import socket from "../../utils/socket"
import {addMessage, MessageProps, useLoadingMessages, useSelectMessagesByChatId} from "./chatMessageSlice"
import {useAdminDispatch} from "../../store"
import {sendMessageByChatId} from "./sendMessageByChatId"
import {fetchMessageByChatId} from "./fetchMessageByChatId"
import {LoadingBlock} from "../../lib/ui"

interface ChatMoreProps {
    onClearChat: () => void
    close: () => void
    selectChat: ChatProps
}

const ChatMore: React.FC<ChatMoreProps> = ({onClearChat, selectChat, close}) => {
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)
    const [textMessageValue, setTextMessageValue] = useState("")
    const dispatch = useAdminDispatch()
    const messages = useSelectMessagesByChatId(selectChat.id)
    const loading = useLoadingMessages()

    const onChangeHandler = (e: any) => {
        setTextMessageValue(e.currentTarget.value)
    }

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        if (textMessageValue.trim() !== "") {
            setLoadingSendMessage(true)
            setTextMessageValue("")
            await dispatch(sendMessageByChatId({id: selectChat.id, data: {message: textMessageValue}}))
            setLoadingSendMessage(false)
        }
    }

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            if (e.ctrlKey) {
                setTextMessageValue((prevState: string) => prevState + "\n")
                return true
            }
            return onSubmitHandler(e)
        }
    }

    useEffect(() => {
        const promise = dispatch(fetchMessageByChatId(selectChat.id))
        return () => {
            promise.abort()
        }
    }, [dispatch, selectChat])

    useEffect(() => {
        if (messages?.length) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock) scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        socket.on(`chat_${selectChat.id}`, (message: MessageProps) => {
            socket.emit("read_new_message", {id: message.id})
            dispatch(addMessage(message))
        })
        return () => {
            socket.off(`chat_${selectChat.id}`)
        }
    }, [selectChat, dispatch])

    return (
        <div className={styles.chat}>
            <div className={styles.head}>
                <div className={styles.back} onClick={onClearChat}>
                    <ArrowLeftOutlined />
                </div>
                <div className={styles.profile}>
                    {selectChat.facebook_client?.name || "Неизвестный пользователь"}
                </div>
                <div className={styles.close} onClick={close}>
                    <CloseOutlined />
                </div>
            </div>
            <div className={styles.chatContainer}>
                {
                    loading ?
                        <LoadingBlock /> :
                        <div className={styles.container} id="scroll-chat">
                            {messages.map((message, key) =>
                                message.user_id ?
                                    <div className={cn(styles.message, styles.outbox)} key={message.id}>
                                        <div className={styles.messageBlock}>
                                            <div className={styles.messageContent}>{message.message}</div>
                                            <div className={styles.messageTimestamp}>
                                                {
                                                    messages.length - 1 === key &&
                                                    message.delivered_at &&
                                                    message.read_at &&
                                                    <EyeFilled className={styles.icon} />
                                                }
                                                {formatTime(message.created_at)}
                                            </div>
                                        </div>
                                    </div> :
                                    <div className={cn(styles.message, styles.inbox)} key={message.id}>
                                        <div className={styles.messageBlock}>
                                            <div className={styles.messageContent}>{message.message}</div>
                                            <div
                                                className={styles.messageTimestamp}>{formatTime(message.created_at)}</div>
                                        </div>
                                    </div>
                            )}
                        </div>
                }
                <div className={styles.inputMessageBlock}>
                    <form className={styles.inputForm}>
                        <TextareaAutosize
                            className={styles.inputMessage}
                            placeholder="Введите сообщение..."
                            autoFocus
                            maxRows={5}
                            value={textMessageValue}
                            name="message"
                            onChange={onChangeHandler}
                            onKeyDown={onKeyDownHandler}
                        />
                        <Button icon={<SendOutlined />} type="primary" shape="circle" size="large"
                                loading={loadingSendMessage}
                                onClick={onSubmitHandler} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatMore
