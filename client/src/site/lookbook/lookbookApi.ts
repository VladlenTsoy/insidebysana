import {createApi} from "@reduxjs/toolkit/query/react"
import {Lookbook, LookbookCategory} from "types/Lookbook"
import baseQuery from "utils/apiConfig"

interface Response extends LookbookCategory {
    images: Lookbook[]
}

export const lookbookApi = createApi({
    reducerPath: "lookbookApi",
    baseQuery,
    endpoints: build => ({
        getLookbookByLatest: build.query<Response, void>({
            query: () => `lookbook`
        }),
        getLookbookByCategoryId: build.query<Response, string>({
            query: id => `lookbook/category/${id}`
        }),
        getLookbookCategories: build.query<LookbookCategory[], number>({
            query: categoryId => `lookbook-categories/${categoryId}`
        })
    })
})

export const {
    useGetLookbookByCategoryIdQuery,
    useGetLookbookByLatestQuery,
    useGetLookbookCategoriesQuery
} = lookbookApi
