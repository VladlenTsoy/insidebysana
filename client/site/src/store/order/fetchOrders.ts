import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Order} from "../../types/order"

type ReturnedType = Order[]

export const fetchOrders = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "orders/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `orders`, {signal})
    },
    {
        // condition(_, {getState}) {
            // const {order} = getState()
            // return !order.ids.length
        // }
    }
)
