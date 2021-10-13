import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface GetPhotoByProductColorIdReturnType {
    url: string
}

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
    id?: number
    pathToImage: string
}

interface RemoveReturnType {
    status: "success"
}

export const photoApi = createApi({
    reducerPath: "photoApi",
    baseQuery,
    tagTypes: ["photo", "product_photo"],
    endpoints: builder => ({
        getPhotoByProductColorId: builder.query<GetPhotoByProductColorIdReturnType[], number>({
            query: productColorId => `user/admin/product-color/${productColorId}/images`
        }),
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
                url: `user/image/delete`,
                method: "POST",
                body
            }),
            invalidatesTags: ["photo"]
        })
    })
})

export const {useUploadPhotoMutation, useDeletePhotoMutation, useGetPhotoByProductColorIdQuery} = photoApi
