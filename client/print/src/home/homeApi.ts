import {createApi} from "@reduxjs/toolkit/query/react"
import {PrintProductCard} from "print-products/productApi"
import baseQuery from "utils/apiConfig"

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery,
    endpoints: build => ({
        getProductsLatest: build.query<PrintProductCard[], void>({
            query: () => `print-image/products/latest`
        })
    })
})

export const {useGetProductsLatestQuery} = homeApi
