import {createAsyncThunk} from "@reduxjs/toolkit"
import {CashierThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {OrderPos} from "admin/lib/types/Order"

type ReturnedType = OrderPos[]

type ArgsProps = {
    dateFrom: any
    dateTo: any
}

export const fetchOrders = createAsyncThunk<ReturnedType, ArgsProps, CashierThunkProps>(
    "orders/fetch",
    async ({dateFrom, dateTo}, {signal}) => {
        return await apiRequest("post", `cashier/orders`, {signal, data: {dateFrom, dateTo}})
    }
    // {
    //     condition(_, {getState}) {
    //         const {order} = getState()
    //         return !order.ids.length
    //     }
    // }
)
