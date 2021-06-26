import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
interface ProductResponse {
    id: number
}

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getProductsByPrintId: build.query<ProductResponse[], number>({
            query: printId => `print/${printId}/products`
        })
    })
})

export const {useGetProductsByPrintIdQuery} = productApi
