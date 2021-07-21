import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {Size} from "../../../lib/types/Size"
import {AdminThunkProps} from "../store"

type ReturnedType = Size["id"]

type AgrProps = Size["id"]

export const displaySize = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/size/display",
    async id => {
        //
        const response = await apiRequest("patch", `admin/size/${id}/display`)
        response && message({type: "success", content: "Вы успешно вернули размер!"})
        return id
    }
)
