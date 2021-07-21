import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {Color} from "../../../lib/types/Color"
import {AdminThunkProps} from "../store"

type ReturnedType = Color["id"]

type AgrProps = Color["id"]

export const displayColor = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/color/display",
    async id => {
        //
        const response = await apiRequest("patch", `admin/color/${id}/display`)
        response && message({type: "success", content: "Вы успешно вернули цвет!"})
        return id
    }
)
