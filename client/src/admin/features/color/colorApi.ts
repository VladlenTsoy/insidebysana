import {createApi} from "@reduxjs/toolkit/query/react"
import {Color} from "types/Color"
import baseQuery from "utils/apiConfig"

export const colorApi = createApi({
    reducerPath: "colorApi",
    baseQuery,
    tagTypes: ["color"],
    endpoints: build => ({
        getAllColors: build.query<Color[], void>({
            query: body => ({
                url: `user/admin/colors`,
                method: "GET",
                body
            }),
            providesTags: ["color"]
        })
    })
})

export const {useGetAllColorsQuery} = colorApi
