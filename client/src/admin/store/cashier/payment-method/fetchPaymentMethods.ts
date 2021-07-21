import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {CashierThunkProps} from "../store"
import {PaymentMethod} from "../../../lib/types/payment/PaymentMethod"

type ReturnedType = PaymentMethod[]

export const fetchPaymentMethods = createAsyncThunk<ReturnedType, undefined, CashierThunkProps>(
    "cashier/payment-methods/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `cashier/payment-methods`, {signal})
    },
    {
        condition(_, {getState}) {
            const {paymentMethod} = getState()
            return !paymentMethod.ids.length
        }
    }
)
