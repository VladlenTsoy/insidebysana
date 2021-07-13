import {createApi} from "@reduxjs/toolkit/query/react"
import {Lookbook} from "types/Lookbook"
import baseQuery from "utils/apiConfig"

export const lookbookApi = createApi({
    reducerPath: "lookbookApi",
    baseQuery,
    endpoints: build => ({
        getLookbook: build.query<Lookbook[], void>({
            query: () => `lookbook`
        })
    })
})

export const {useGetLookbookQuery} = lookbookApi
