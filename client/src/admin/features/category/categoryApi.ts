import {createApi} from '@reduxjs/toolkit/query/react'
import {Category} from 'types/Category'
import baseQuery from 'utils/apiConfig'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    tagTypes: ['category', 'filter-category'],
    endpoints: build => ({
        getAllCategories: build.query<Category[], void>({
            query: body => ({
                url: `user/admin/categories`,
                method: 'GET',
                body
            }),
            providesTags: ['category']
        }),
        getFilterCategories: build.query<Category[], void>({
            query: body => ({
                url: `user/admin/filter/categories`,
                method: 'GET',
                body
            }),
            providesTags: ['filter-category']
        })
    })
})

export const {useGetAllCategoriesQuery, useGetFilterCategoriesQuery} = categoryApi
