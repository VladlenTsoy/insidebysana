import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import moment from "moment"
import {fetchMessageByChatId} from "./fetchMessageByChatId"
import {StoreState} from "../../store"
import {useSelector} from "react-redux"

export interface MessageProps {
    id: number
    message: string
    chat_id: number
    user_id: number | null
    send_timestamp: number
    delivered_at: string | null
    read_at: string | null
    created_at: string
}

export interface StateProps {
    loading: boolean
}

export const chatMessageAdapter = createEntityAdapter<MessageProps>({
    selectId: message => message.id,
    sortComparer: (a, b) => moment(a.created_at).isAfter(b.created_at) ? 1 : 0
})

const initialState = chatMessageAdapter.getInitialState<StateProps>({
    loading: true
})

const chatMessageSlice = createSlice({
    name: "chat-message",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageProps>) => {
            chatMessageAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMessageByChatId.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMessageByChatId.fulfilled, (state, action) => {
            chatMessageAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchMessageByChatId.rejected, (state) => {
            state.loading = false
        })
    }
})

export const {
    selectAll: selectAllMessages
} = chatMessageAdapter.getSelectors<StoreState>(state => state.chatMessage)

export const {addMessage} = chatMessageSlice.actions

export default chatMessageSlice.reducer


/**
 * Вывод всех сообщений
 */
export const useSelectAllMessages = () => useSelector(selectAllMessages)

/**
 * Вывод сообщений в чате
 * @param chatId
 */
export const useSelectMessagesByChatId = (chatId: MessageProps["chat_id"]) => {
    const messages = useSelectAllMessages()
    return messages.filter(message => message.chat_id === chatId)
}

/**
 * Вывод загрузки сообщений в чате
 */
export const useLoadingMessages = (): boolean =>
    useSelector((state: StoreState) => state.chatMessage.loading || false)
