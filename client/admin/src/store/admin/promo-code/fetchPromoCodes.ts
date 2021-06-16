import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {PromoCode} from "../../../lib/types/PromoCode"

type ReturnedType = PromoCode[]

export const fetchPromoCodes = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/promo-code/fetch/all",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `admin/promo-codes`, {signal})
    }
)
