import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColor} from "../../../lib/types/product/ProductColor"

type ReturnedType = {
    total: number
    results: ProductColor[]
}

export const fetchProductColors = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/product-colors/fetch",
    async (_, {signal, getState}) => {
        const {productColor} = getState()
        const {pagination, sorter, categoryId, search} = productColor
        //
        return await apiRequest("post", `admin/product-colors/table`, {
            signal,
            data: {
                pagination, sorter, categoryId, search
            }
        })
    }
)
