import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface PrintImageResponse {
    id: number
    price: number
    title: string
    url_image: string
}

export const printImageApi = createApi({
    reducerPath: "printImageApi",
    baseQuery,
    endpoints: build => ({
        getPrintImagesByCategoryId: build.query<PrintImageResponse[], string>({
            query: categoryId => `print-images/${categoryId}`
        })
    })
})

export const {useGetPrintImagesByCategoryIdQuery} = printImageApi
