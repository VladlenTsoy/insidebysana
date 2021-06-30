import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

interface ProductResponse {
    id: number
    title: string
    url_image: string
    url_thumbnail: string
}

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getProductsLatest: build.query<ProductResponse[], void>({
            query: () => `print-image/products/latest`
        })
    })
})

export const {useGetProductsLatestQuery} = homeApi
