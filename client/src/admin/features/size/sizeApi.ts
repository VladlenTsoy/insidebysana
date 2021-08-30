import {createApi} from "@reduxjs/toolkit/query/react"
import {Size} from "types/Size"
import baseQuery from "utils/apiConfig"

export const sizeApi = createApi({
    reducerPath: "sizeApi",
    baseQuery,
    tagTypes: ["size"],
    endpoints: build => ({
        getAllSizes: build.query<Size[], void>({
            query: body => ({
                url: `user/admin/sizes`,
                method: "GET",
                body
            }),
            providesTags: ["size"]
        })
    })
})

export const {useGetAllSizesQuery} = sizeApi
