import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

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
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api"}),
    endpoints: build => ({
        getCategories: build.query<CategoryResponse[], void>({
            query: () => `print-categories`
        })
    })
})

export const {useGetCategoriesQuery} = categoryApi
