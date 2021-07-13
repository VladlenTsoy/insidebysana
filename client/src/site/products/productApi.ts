import {createApi} from "@reduxjs/toolkit/query/react"
import {ProductColorCard, ProductColor} from "types/productColor"
import baseQuery from "utils/apiConfig"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    endpoints: build => ({
        getProductsLatest: build.query<ProductColorCard[], void>({
            query: () => `new-products`
        }),
        getProductsBySearch: build.mutation<ProductColorCard[], string>({
            query: search => ({
                url: `search-products`,
                method: "post",
                body: {search}
            })
        }),
        getProductById: build.query<ProductColor, string>({
            query: id => `product-color/${id}`
        })
    })
})

export const {useGetProductsLatestQuery, useGetProductsBySearchMutation, useGetProductByIdQuery} = productApi
