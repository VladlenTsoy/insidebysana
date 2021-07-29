import {createApi} from "@reduxjs/toolkit/query/react"
import {Category} from "types/Category"
import baseQuery from "utils/apiConfig"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    endpoints: build => ({
        getCategories: build.query<Category[], void>({
            query: () => `user/cashier/categories`
        })
    })
})

export const {useGetCategoriesQuery} = categoryApi
