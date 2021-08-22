import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    tagTypes: ["product"],
    endpoints: build => ({
        getAllProducts: build.query<any[], void>({
            query: () => ({
                url: `user/admin/products`,
                method: "POST"
            }),
            providesTags: ["product"]
        }),
        createProduct: build.mutation<any, Partial<any>>({
            query: body => ({
                url: `user/admin//product`,
                method: "POST",
                body
            }),
            invalidatesTags: ["product"]
        })
    })
})

export const {useGetAllProductsQuery} = productApi
