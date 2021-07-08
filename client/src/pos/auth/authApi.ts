import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {ThunkProps} from "../store"
import {User} from "types/User"
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
    return await apiRequest("post", `login`, {data: {...data}, signal, type: "guest"})
})

// Вывод пользователя
export const fetchUser = createAsyncThunk<User, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal}) => {
        return (await apiRequest("get", `/`, {signal}).catch(e => {
            if (e.message === "error_token") removeCookie("crm_token_access")
        })) as User
    },
    {
        condition(_) {
            if (!getCookie("crm_token_access")) return false
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
