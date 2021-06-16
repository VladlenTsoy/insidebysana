import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "lib/ui"
import {Color} from "../../../lib/types/Color"
import {AdminThunkProps} from "../store"

type ReturnedType = Color

interface AgrProps {
    id: number
    data: {
        title: Color["title"]
        hex: Color["hex"]
    }
}

export const editColor = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/color/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/color/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили цвет!"})
        return response
    }
)