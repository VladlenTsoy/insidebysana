import React, {useState} from "react"
import ChatList from "./ChatList"
import ChatMore from "./ChatMore"
import {ChatProps} from "./facebookChatApi"

interface FacebookChatProps {
    close: () => void
}

const FacebookChat: React.FC<FacebookChatProps> = ({close}) => {
    const [selectChat, setSelectChat] = useState<ChatProps>()

    // Выбрать чат
    const onSelectChat = (chat: ChatProps) => setSelectChat(chat)
    // Очистить чат
    const onClearChat = () => setSelectChat(undefined)

    return (
        <>
            {selectChat ? <ChatMore onClearChat={onClearChat} selectChat={selectChat} close={close} /> :
                <ChatList selectChat={onSelectChat} close={close}/>}
        </>
    )
}

export default FacebookChat
