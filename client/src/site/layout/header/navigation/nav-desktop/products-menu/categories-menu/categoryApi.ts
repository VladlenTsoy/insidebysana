import {createApi} from "@reduxjs/toolkit/query/react"
import {Category} from "types/Category"
import baseQuery from "utils/apiConfig"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    tagTypes: ["category"],
    endpoints: build => ({
        // getCategoryById: build.query<Category, number>({
        //     query: id => `category/${id}`,
        //     providesTags: (result, error, id) => [{type: "category", id}]
        // }),
        getCategories: build.query<Category[], void>({
            query: () => `categories`,
            providesTags: result =>
                result
                    ? [...result.map(({id}) => ({type: "category" as const, id}))]
                    : [{type: "category", id: "LIST"}]
        })
    })
})

// Вывод категории по ID
type GetCategoryByIdType = (id: number) => {category: Category | undefined; isLoading: boolean}

export const useGetCategoryById: GetCategoryByIdType = id => {
    const {data: categories = [], isLoading} = useGetCategoriesQuery()
    return {isLoading, category: categories.find(_category => _category.id === id)}
}

export const {useGetCategoriesQuery, usePrefetch} = categoryApi
