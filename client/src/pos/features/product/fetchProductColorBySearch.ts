import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../../store"
import {apiRequest} from "utils/api"
import {ProductCardType} from "pos/features/product/product"

type ReturnedType = {
    total: number
    results: ProductCardType[]
}

type AgrsProps = {
    search?: string
    categoryId?: number
    sizeId?: number
    currentPage?: number
}

export const fetchProductColorBySearch = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "pos/product-color/fetch",
    async ({search = "", categoryId = 0, sizeId = 0, currentPage = 0}, {signal, getState}) => {
        const {
            pagination: {limit}
        } = getState().product

        return await apiRequest("post", `cashier/search-products`, {
            data: {search, categoryId, sizeId, currentPage, limit},
            signal
        })
    },
    {
        condition: (_, {getState}) => {
            const {product} = getState()
            return (
                !product.loading &&
                (product.pagination.total === 0 || product.pagination.total > product.ids.length)
            )
        },
        dispatchConditionRejection: true
    }
)
