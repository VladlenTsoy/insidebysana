import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Order} from "../../../lib/types/Order"

type ReturnedType = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

type AgrProps = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

export const changePaymentStateOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/payment/state",
    async ({orderId, paymentState}) => {
        const response = await apiRequest("patch", `admin/order/${orderId}/payment-state`, {
            data: {paymentState}
        })
        response && message({type: "success", content: "Вы успешно изменили статус платежа сделки!"})
        return {orderId, paymentState}
    }
)
