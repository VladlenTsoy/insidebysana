import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AdminThunkProps} from "../store"
import {Newsletter} from "../../../lib/types/Newsletter"

type ReturnedType = Newsletter[]

export const fetchNewsletter = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/newsletter/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/newsletter`, {signal})
    },
    {
        condition(_, {getState}) {
            const {newsletter} = getState()
            return !newsletter.ids.length
        }
    }
)
