import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"

type ReturnedType = any

export const fetchStatuses = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/status/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `admin/statuses`, {signal})
    },
    {
        condition(_, {getState}) {
            const {status} = getState()
            return !status.ids.length
        }
    }
)
