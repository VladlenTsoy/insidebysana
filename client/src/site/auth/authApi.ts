import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {ThunkProps} from "../store"
import {User} from "./user"
import {getCookie, removeCookie} from "utils/cookie"

// Аторизация пользователя
export const authUser = createAsyncThunk<
    {
        token: string
    },
    {
        email: string
        password: string
    },
    ThunkProps
>("user/auth", async (data, {signal}) => {
    return await apiRequest("post", `client/login`, {data: {...data}, signal, type: "guest"})
})

// Вывод пользователя
export const fetchUser = createAsyncThunk<User, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal}) => {
        return (await apiRequest("get", `/`, {signal, type: "user"}).catch(e => {
            if (e.message === "error_token") removeCookie("site_token_access")
        })) as User
    },
    {
        condition(_) {
            if (!getCookie("site_token_access")) return false
        },
        dispatchConditionRejection: true
    }
)

// Завершения сеанса
export const logoutUser = createAsyncThunk<
    {
        status: "success"
    },
    undefined,
    ThunkProps
>("user/logout", async (_, {signal}) => {
    return await apiRequest("delete", `logout`, {signal})
})

//
export const registrationUser = createAsyncThunk<
    {
        token: string
    },
    {
        full_name: string
        login: string
        password: string
    },
    ThunkProps
>("user/registration", async (data, {signal}) => {
    return await apiRequest("post", `client/registration`, {data, signal, type: "guest"})
})

export const updateUser = createAsyncThunk<
    User,
    {
        full_name: string | null
        email: string | null
        phone: string | null
    },
    ThunkProps
>("user/update", async (data, {signal}) => {
    return await apiRequest("post", `/update`, {signal, data})
})

export const changePassword = createAsyncThunk<
    {
        status: string
    },
    {
        password: string
    },
    ThunkProps
>("user/change-password", async (data, {signal}) => {
    return await apiRequest("post", `/change-password`, {signal, data})
})
