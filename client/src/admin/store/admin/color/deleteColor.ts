import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {Color} from "../../../lib/types/Color"
import {AdminThunkProps} from "../store"

type ReturnedType = Color['id']

type AgrProps = Color['id']

export const deleteColor = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/color/delete",
    async (id) => {
        //
        const response = await apiRequest("delete", `admin/color/${id}`)
        response && message({type: "success", content: "Вы успешно удалили цвет!"})
        return id
    }
)