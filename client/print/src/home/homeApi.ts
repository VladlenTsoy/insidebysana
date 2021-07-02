import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {PrintProductCard} from "print-products/productApi"

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getProductsLatest: build.query<PrintProductCard[], void>({
            query: () => `print-image/products/latest`
        })
    })
})

export const {useGetProductsLatestQuery} = homeApi
