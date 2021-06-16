import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {apiRequest} from "../../utils/api"

type ReturnedType = {
    status: string
}

type ArgsProps = string

export const subscribeNewsletter = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "newsletter/subscribe",
    async (email, {signal}) => {
        //
        return await apiRequest("post", `newsletter/subscribe`, {type: "guest", signal, data: {email}})
    }
)