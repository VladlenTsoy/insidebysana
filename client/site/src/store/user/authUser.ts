import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {ThunkProps} from "../store"

interface ArgsProps {
    login: string
    password: string
}

interface ReturnedType {
    token: string
}

// Аторизация пользователя
export const authUser = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "user/auth",
    async (data, {signal}) => {
        return await apiRequest("post", `client/login`, {data, signal, type: "guest"})
    }
)