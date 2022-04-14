import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../store"
import {apiRequest} from "../../utils/api"

type ReturnedType = {status: "success" | "error"}

interface ArgsProps {
    id: number
    data: {
        message: string
    }
}

/**
 * Добавить сообщение
 */
export const sendMessageByChatId = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/chat-message/send",
    async ({id, data}, {signal}) => {
        return await apiRequest("post", `facebook/chat/${id}/message`, {data, signal, type: "guest"})
    }
)
