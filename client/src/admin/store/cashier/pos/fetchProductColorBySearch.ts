import {createAsyncThunk} from "@reduxjs/toolkit"
import {CashierThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorCard} from "admin/lib/types/cashier/PosProductColor"

type ReturnedType = ProductColorCard[]

type AgrsProps = {
    search: string
    categoryId: number
    sizeId: number
}

export const fetchProductColorBySearch = createAsyncThunk<ReturnedType, AgrsProps, CashierThunkProps>(
    "pos/product-color/fetch",
    async ({search, categoryId, sizeId}, {signal}) => {
        return await apiRequest("post", `cashier/search-products`, {
            data: {search, categoryId, sizeId},
            signal
        })
    }
)
