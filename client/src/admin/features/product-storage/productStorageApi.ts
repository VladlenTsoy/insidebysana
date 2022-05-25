import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {ProductStorage} from "types/product/ProductStorage"

export const productStorageApi = createApi({
    reducerPath: "productStorageApi",
    baseQuery,
    tagTypes: ["product-storage"],
    endpoints: build => ({
        getProductStorages: build.query<ProductStorage[], void>({
            query: body => ({
                url: `user/admin/product-storages`,
                method: "GET",
                body
            }),
            providesTags: ["product-storage"]
        })
    })
})

export const {useGetProductStoragesQuery} = productStorageApi
