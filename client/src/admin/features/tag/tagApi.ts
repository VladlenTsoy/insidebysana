import {createApi} from "@reduxjs/toolkit/query/react"
import {Tag} from "types/Tag"
import baseQuery from "utils/apiConfig"

export const tagApi = createApi({
    reducerPath: "tagApi",
    baseQuery,
    tagTypes: ["tag"],
    endpoints: build => ({
        getAllTags: build.query<Tag[], void>({
            query: body => ({
                url: `user/admin/tags`,
                method: "GET",
                body
            }),
            providesTags: ["tag"]
        })
    })
})

export const {useGetAllTagsQuery} = tagApi
