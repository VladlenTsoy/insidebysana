import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Order} from "../../../lib/types/Order"

type ReturnedType = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

type AgrProps = Order["id"]

export const cancelOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/cancel",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/cancel`)
        response && message({type: "success", content: "Вы успешно отменили сделку!"})
        return response
    }
)
