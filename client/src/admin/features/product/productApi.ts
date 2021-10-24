import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {CreateDataParams, EditDataParams, SelectProductsFilterParams} from "../../types/Product"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    tagTypes: ["product"],
    endpoints: build => ({
        getAllProducts: build.mutation<any, SelectProductsFilterParams>({
            query: body => ({
                url: `user/admin/product-colors/table`,
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        createProduct: build.mutation<{status: string}, Partial<CreateDataParams>>({
            query: body => ({
                url: `user/admin/product`,
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        editProduct: build.mutation<{status: string}, Partial<EditDataParams>>({
            query: body => ({
                url: `user/admin/product/edit/${body.id}`,
                method: "post",
                body
            }),
            invalidatesTags: ["product"]
        }),
        getProductById: build.query<any, string>({
            query: id => ({
                url: `user/admin/product/${id}`,
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
