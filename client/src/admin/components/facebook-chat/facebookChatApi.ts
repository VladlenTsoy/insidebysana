import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "../../../utils/apiConfig"
import {MessageProps} from "./chatMessageSlice"

export interface ChatProps {
    id: number
    client_id: number | null
    facebook_client_id: number
    facebook_client: {
        firstName: string
        id: string
        lastName: string
        name: string
        profilePic: string
    } | null
    last_message: MessageProps
}

export const facebookChatApi = createApi({
    reducerPath: "facebookChatApi",
    baseQuery,
    tagTypes: ["chat"],
    endpoints: builder => ({
        getAll: builder.query<ChatProps[], void>({
            query: () => `facebook/chats`
        })
    })
})

export const {useGetAllQuery} = facebookChatApi
