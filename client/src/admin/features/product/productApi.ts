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
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        createProduct: build.mutation<any, Partial<any>>({
            query: body => ({
                url: `user/admin/new/product`,
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        editProduct: build.mutation<any, Partial<any>>({
            query: body => ({
                url: `user/admin/new/product/edit/${body.id}`,
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        getProductById: build.query<any, string>({
            query: id => ({
                url: `user/admin/new/product/${id}`,
                method: "get"
            }),
            providesTags: ["product"]
        })
    })
})

export const {
    useGetAllProductsMutation,
    useCreateProductMutation,
    useGetProductByIdQuery,
    useEditProductMutation
} = productApi
