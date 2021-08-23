import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    tagTypes: ["product"],
    endpoints: build => ({
        getAllProducts: build.mutation<any, any>({
            query: body => ({
                url: `user/admin/product-colors/table`,
                method: "POST",
                body
            }),
            invalidatesTags: ["product"]
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

export const {useGetAllProductsMutation} = productApi
