import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchUser, authUser, logoutUser, registrationUser} from "./authApi"
import {StoreState} from "../store"
import {updateToken} from "utils/api"
import {User} from "./user"
import {getCookie} from "utils/cookie"
import {useSelector} from "react-redux"

interface StateProps {
    token: string | null
    loading: boolean
    detail: User | null
}

const initialState: StateProps = {
    token: getCookie("site_token_access") || null,
    detail: null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
            updateToken(action.payload)
            if (action.payload === null) state.detail = null
        }
    },
    extraReducers: builder => {
        // Вывод пользователя
        builder.addCase(fetchUser.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.detail = action.payload
            state.loading = false
        })
        // Авторизация пользователя
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.token = action.payload.token
            updateToken(action.payload.token)
        })
        // Авторизация пользователя
        builder.addCase(registrationUser.fulfilled, (state, action) => {
            state.token = action.payload.token
            updateToken(action.payload.token)
        })
        // Выход пользователя
        builder.addCase(logoutUser.pending, state => {
            state.loading = true
        })
        builder.addCase(logoutUser.fulfilled, state => {
            updateToken(null)
            state.token = null
            state.detail = null
            state.loading = false
        })
    }
})

// Вывод действий
export const {changeToken} = authSlice.actions

//
export const authSelector = (state: StoreState) => state.auth

// Вывод пользователя
export const useUser = () => useSelector((state: StoreState) => state.auth)

export default authSlice.reducer
