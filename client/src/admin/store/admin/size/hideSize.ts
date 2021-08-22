import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {AdminThunkProps} from "../../../store"
import {Size} from "types/Size"

type ReturnedType = Size["id"]

type AgrProps = Size["id"]

export const hideSize = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/size/hide",
    async id => {
        //
        const response = await apiRequest("patch", `admin/size/${id}/hide`)
        response && message({type: "success", content: "Вы успешно скрыли размер!"})
        return id
    }
)
