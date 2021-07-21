import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface CategoryResponse {
    id: number
    title: string
    url_image: string
    sub_categories: {
        id: number
        title: number
    }[]
}

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    endpoints: build => ({
        getCategories: build.query<CategoryResponse[], void>({
            query: () => `print-categories`
        })
    })
})

export const {useGetCategoriesQuery} = categoryApi
