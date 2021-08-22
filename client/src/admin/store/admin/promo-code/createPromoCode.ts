import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PromoCode} from "../../../lib/types/PromoCode"

type ReturnedType = PromoCode

export const createPromoCode = createAsyncThunk<ReturnedType, any, AdminThunkProps>(
    "admin/promo-code/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/promo-code`, {data})
        response && message({type: "success", content: "Вы успешно создали промокод!"})
        return response
    }
)
