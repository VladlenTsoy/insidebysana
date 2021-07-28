import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../../store"
import {apiRequest} from "utils/api"
import {ProductCardType} from "pos/features/product/product"

type ReturnedType = ProductCardType[]

type AgrsProps = {
    search: string
    categoryId: number
    sizeId: number
    currentPage: number
}

export const fetchProductColorBySearch = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "pos/product-color/fetch",
    async ({search, categoryId, sizeId, currentPage}, {signal}) => {
        return await apiRequest("post", `cashier/search-products`, {
            data: {search, categoryId, sizeId, currentPage},
            signal
        })
    },
    // {
    //     condition: (_, {getState}) => {
    //         const {pos} = getState()
    //         return pos.pagination.total === 0 || pos.pagination.total < pos.ids.length
    //     }
    // }
)
