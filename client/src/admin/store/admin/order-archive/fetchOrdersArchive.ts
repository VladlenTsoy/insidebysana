import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"

type ReturnedType = any

type ArgsProps = {
    dateFrom: any
    dateTo: any
    sourceId?: number
}

export const fetchOrdersArchive = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/order-archive/orders/fetch",
    async ({dateFrom, dateTo, sourceId = 0}, {signal}) => {
        //
        return await apiRequest("post", `admin/orders-archive`, {signal, data: {dateFrom, dateTo, sourceId}})
    }
    // {
    //     condition(arg: ArgsProps, {getState}) {
    //         const {orderArchive} = getState()
    //         return !orderArchive.ids.length
    //     }
    // }
)
