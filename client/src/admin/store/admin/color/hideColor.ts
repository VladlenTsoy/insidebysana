import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {Color} from "../../../lib/types/Color"
import {AdminThunkProps} from "../store"

type ReturnedType = Color["id"]

type AgrProps = Color["id"]

export const hideColor = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/color/hide",
    async id => {
        //
        const response = await apiRequest("patch", `admin/color/${id}/hide`)
        response && message({type: "success", content: "Вы успешно скрыли цвет!"})
        return id
    }
)
