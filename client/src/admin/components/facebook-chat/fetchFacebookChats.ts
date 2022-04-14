import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../store"
import {apiRequest} from "../../utils/api"
import {ChatProps} from "./facebookChatSlice"

export const fetchFacebookChats = createAsyncThunk<ChatProps[], void, AdminThunkProps>(
    "admin/chats",
    async (id, {signal}) => {
        return await apiRequest("get", `facebook/chats`, {signal, type: "guest"})
    }
)
