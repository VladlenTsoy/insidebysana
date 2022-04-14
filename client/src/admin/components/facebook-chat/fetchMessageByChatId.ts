import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../store"
import {apiRequest} from "../../utils/api"
import {MessageProps} from "./chatMessageSlice"

export const fetchMessageByChatId = createAsyncThunk<MessageProps[], number, AdminThunkProps>(
    "admin/chat-message/fetch",
    async (id, {signal}) => {
        return await apiRequest("get", `facebook/chat/${id}/messages`, {signal, type: "guest"})
    }
)
