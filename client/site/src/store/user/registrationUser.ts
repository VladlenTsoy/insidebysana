import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {ThunkProps} from "../store"

interface ArgsProps {
    full_name: string
    login: string
    password: string
}

interface ReturnedType {
    token: string
}

//
export const registrationUser = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "user/registration",
    async (data, {signal}) => {
        return await apiRequest("post", `client/registration`, {data, signal, type: "guest"})
    }
)