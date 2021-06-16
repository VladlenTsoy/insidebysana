import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Lookbook} from "../../../lib/types/Lookbook"

type ReturnedType = Lookbook[]

export const fetchLookbook = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/lookbook/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/lookbook`, {signal})
    },
    {
        condition(_, {getState}) {
            const {lookbook} = getState()
            return !lookbook.ids.length
        }
    }
)
