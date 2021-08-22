import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PromoCode} from "../../../lib/types/PromoCode"

type ReturnedType = PromoCode

interface AgrProps {
    data: any
    id: PromoCode["id"]
}

export const editPromoCode = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/promo-code/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/promo-code/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили промокод!"})
        return response
    }
)
