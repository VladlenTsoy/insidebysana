import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

interface PrintImageResponse {
    id: number
    price: number
    title: string
    url_image: string
}

export const printImageApi = createApi({
    reducerPath: "printImageApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getPrintImagesByCategoryId: build.query<PrintImageResponse[], string>({
            query: categoryId => `print-images/${categoryId}`
        })
    })
})

export const {useGetPrintImagesByCategoryIdQuery} = printImageApi
