import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export interface PrintProductCard {
    id: number
    title: string
    price: number
    discount: {discount: number}
    url_thumbnail: string
}
export interface PrintProduct {
    id: number
    title: string
    url_image: string
    sizes_props: {
        size_id: number
        title: string
        qty: number
    }[]
    colors: {id: number; product_id: number; hex: string}[]
    product_color_id: number
    print_image_id: number
    price: number
    discount: {discount: number}
}

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getProductsByPrintId: build.query<PrintProductCard[], string>({
            query: printId => `print-image/${printId}/products`
        }),
        getProductById: build.query<PrintProduct, string>({
            query: id => `print-product/${id}`
        })
    })
})

export const {useGetProductsByPrintIdQuery, useGetProductByIdQuery} = productApi
