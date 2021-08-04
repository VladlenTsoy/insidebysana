import {createApi} from "@reduxjs/toolkit/query/react"
import {Size} from "types/Size"
import baseQuery from "utils/apiConfig"

export const sizeApi = createApi({
    reducerPath: "sizeApi",
    baseQuery,
    endpoints: build => ({
        getSize: build.query<Size[], void>({
            query: () => `user/cashier/sizes`
        })
    })
})

export const {useGetSizeQuery} = sizeApi
