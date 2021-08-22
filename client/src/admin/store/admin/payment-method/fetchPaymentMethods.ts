import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {AdminThunkProps} from "../../../store"
import {PaymentMethod} from "../../../lib/types/payment/PaymentMethod"

type ReturnedType = PaymentMethod[]

export const fetchPaymentMethods = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/payment-methods/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/payment-methods`, {signal})
    },
    {
        condition(_, {getState}) {
            const {paymentMethod} = getState()
            return !paymentMethod.ids.length
        }
    }
)
