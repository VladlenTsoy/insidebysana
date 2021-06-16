import {createSlice} from "@reduxjs/toolkit"
import {User} from "../../types/user"
import {StoreState} from "../store"
import {authUser} from "./authUser"
import {registrationUser} from "./registrationUser"
import {updateToken} from "../../utils/api"
import {getCookie} from "../../utils/cookie"
import {fetchUser} from "./fetchUser"
import {logoutUser} from "./logoutUser"
import {updateUser} from "./updateUser"

export interface StateProps {
    loading: boolean
    token: string | null
    detail: User | null
}

const initialState: StateProps = {
    loading: true,
    detail: null,
    token: getCookie("site_token_access") || null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authUser.fulfilled, (state, action) => {
            updateToken(action.payload.token)
            state.token = action.payload.token
        })
        builder.addCase(registrationUser.fulfilled, (state, action) => {
            updateToken(action.payload.token)
            state.token = action.payload.token
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.detail = action.payload
        })
        builder.addCase(logoutUser.fulfilled, state => {
            updateToken(null)
            state.token = null
            state.detail = null
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.detail = action.payload
        })
    }
})

export const userSelector = (state: StoreState) => state.user

export default userSlice.reducer
