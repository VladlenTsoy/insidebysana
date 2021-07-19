import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Banner} from "../../../lib/types/Banner"

type ReturnedType = Banner[]

export const fetchBanners = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/banners/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/banners`, {signal})
    },
    {
        condition(_, {getState}) {
            const {banner} = getState()
            return !banner.ids.length
        }
    }
)
