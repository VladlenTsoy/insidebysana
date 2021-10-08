import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface HomePosition {
    id: number
    product_color_id: number
    position: number
    created_at: number
}

export const homePositionApi = createApi({
    reducerPath: "homePositionApi",
    baseQuery,
    tagTypes: ["homePosition"],
    endpoints: build => ({
        getAllHomePositions: build.query<HomePosition[], void>({
            query: body => ({
                url: `user/admin/home-products`,
                method: "GET",
                body
            }),
            providesTags: ["homePosition"]
        }),
        getFreeHomePositions: build.query<number[], number>({
            query: position => ({
                url: `user/admin/home-position/free/${position}`,
                method: "GET"
            })
        })
    })
})

export const {useGetAllHomePositionsQuery, useGetFreeHomePositionsQuery} = homePositionApi
