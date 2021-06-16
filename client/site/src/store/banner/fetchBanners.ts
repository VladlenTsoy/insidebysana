import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Banner} from "../../types/banner"

type ReturnedType = Banner[]

export const fetchBanners = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "banners/fetch",
    async (data, {signal}) => {
        //
        return await apiRequest("get", `banners`, {type: "guest", signal, data})
    },
    {
        condition(_, {getState}) {
            const {banner} = getState()
            return !banner.ids.length
        }
    }
)