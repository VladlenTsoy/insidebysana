import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AdminThunkProps} from "../store"
import {Source} from "../../../lib/types/Source"

type ReturnedType = Source[]

export const fetchSources = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/sources/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/sources`, {signal})
    },
    {
        condition(_, {getState}) {
            const {source} = getState()
            return !source.ids.length
        }
    }
)
