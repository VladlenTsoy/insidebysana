import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {AdminThunkProps} from "../../../store"
import {Color} from "admin/lib/types/Color"

type ReturnedType = Color[]

export const fetchColors = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/colors/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/colors`, {signal})
    },
    {
        condition(_, {getState}) {
            const {color} = getState()
            return !color.ids.length
        }
    }
)
