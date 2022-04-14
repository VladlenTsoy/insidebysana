import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import moment from "moment"
import {MessageProps, StateProps} from "./chatMessageSlice"
import {fetchFacebookChats} from "./fetchFacebookChats"
import {StoreState} from "../../store"
import {useSelector} from "react-redux"

export interface ChatProps {
    id: number
    client_id: number | null
    facebook_client_id: number
    facebook_client: {
        firstName: string
        id: string
        lastName: string
        name: string
        profilePic: string
    } | null
    count_new_messages: number
    last_message: MessageProps
    created_at: string
}

export const facebookChatAdapter = createEntityAdapter<ChatProps>({
    selectId: message => message.id,
    sortComparer: (a, b) => moment(a.last_message.created_at).isAfter(b.last_message.created_at) ? 1 : 0
})

const initialState = facebookChatAdapter.getInitialState<StateProps>({
    loading: true
})

const facebookChatSlice = createSlice({
    name: "facebook-chat",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFacebookChats.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchFacebookChats.fulfilled, (state, action) => {
            facebookChatAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchFacebookChats.rejected, state => {
            state.loading = false
        })
    }
})


export const {selectAll} = facebookChatAdapter.getSelectors<StoreState>(state => state.facebookChat)

export default facebookChatSlice.reducer

/**
 * Вывод всех чатов
 */
export const useSelectAllChats = () => useSelector(selectAll)

/**
 * Вывод загрузки в чате
 */
export const useLoadingChat = (): boolean =>
    useSelector((state: StoreState) => state.facebookChat.loading || false)
