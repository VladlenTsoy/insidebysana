import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface AddAgrsProps {
    image: any
    time: number
}

interface AddReturnType {
    loading: boolean
    imagePath: string
    imageUrl: string
    id: number
    time: number
}

interface RemoveAgrsProps {
    time: number
}

interface RemoveReturnType {
    status: "success"
}

export const photoApi = createApi({
    reducerPath: "photoApi",
    baseQuery,
    tagTypes: ["photo"],
    endpoints: builder => ({
        uploadPhoto: builder.mutation<AddReturnType, AddAgrsProps>({
            query: body => ({
                url: `user/image/upload`,
                method: "POST",
                body
            }),
            invalidatesTags: ["photo"]
        }),
        deletePhoto: builder.mutation<RemoveReturnType, RemoveAgrsProps>({
            query: body => ({
                url: `user/image/${body.time}`,
                method: "DELETE"
            }),
            invalidatesTags: ["photo"]
        })
    })
})

export const {useUploadPhotoMutation, useDeletePhotoMutation} = photoApi
