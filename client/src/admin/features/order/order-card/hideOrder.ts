import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Order} from "../../../lib/types/Order"

type ReturnedType = Order["id"]

type AgrProps = Order["id"]

export const hideOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/hide",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/hide`)
        response && message({type: "success", content: "Вы успешно отправили заказ в корзину!"})
        return id
    }
)
