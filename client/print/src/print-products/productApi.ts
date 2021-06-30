import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

interface ProductResponse {
    id: number
    title: string
    url_image: string
    url_thumbnail: string
}

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getProductsByPrintId: build.query<ProductResponse[], string>({
            query: printId => `print-image/${printId}/products`
        }),
        getProductById: build.query<ProductResponse, string>({
            query: id => `print-product/${id}`
        })
    })
})

export const {useGetProductsByPrintIdQuery, useGetProductByIdQuery} = productApi
