import {createApi} from "@reduxjs/toolkit/query/react"
import {Category} from "types/Category"
import baseQuery from "utils/apiConfig"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    tagTypes: ["category"],
    endpoints: build => ({
        getAllCategories: build.query<Category[], void>({
            query: body => ({
                url: `user/admin/categories`,
                method: "GET",
                body
            }),
            providesTags: ["category"]
        })
    })
})

export const {useGetAllCategoriesQuery} = categoryApi
