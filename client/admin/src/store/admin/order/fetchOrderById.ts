import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Order} from "lib/types/Order"

type ReturnedType = Order

type ArgsProps = string | number

export const fetchOrderById = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/order/fetch/id",
    async (id, {signal}) => {
        //
        return await apiRequest("get", `admin/order/${id}`, {signal})
    },
    {
        condition(id, {getState}) {
            const {order} = getState()
            return !order.ids.includes(id)
        }
    }
)
