import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Status} from "../../../lib/types/Status"

type ReturnedType = Status

interface AgrProps {
    title: Status["title"]
    actions: any
}

export const createStatus = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/status/create",
    async (data, {signal}) => {
        const response = await apiRequest("post", `admin/status`, {data, signal})
        response && message({type: "success", content: "Вы успешно создали статус!"})
        return response
    }
)
