import {createApi} from '@reduxjs/toolkit/query/react'
import {Size} from 'types/Size'
import baseQuery from 'utils/apiConfig'

export const sizeApi = createApi({
    reducerPath: 'sizeApi',
    baseQuery,
    tagTypes: ['size', 'filter-size'],
    endpoints: build => ({
        getAllSizes: build.query<Size[], void>({
            query: body => ({
                url: `user/sizes`,
                method: 'GET',
                body
            }),
            providesTags: ['size']
        }),
        getFilterSizes: build.query<Size[], void>({
            query: body => ({
                url: `user/admin/filter/sizes`,
                method: 'GET',
                body
            }),
            providesTags: ['filter-size']
        })
    })
})

export const {useGetAllSizesQuery, useGetFilterSizesQuery} = sizeApi
