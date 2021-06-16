import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {StoreState} from "../store"

export interface StateProps {
    loading: boolean
    mobileDrawerVisible: boolean
}

const initialState = {
    loading: true,
    mobileDrawerVisible: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeMobileMenuVisible: (state, action: PayloadAction<StateProps["mobileDrawerVisible"]>) => {
            state.mobileDrawerVisible = action.payload
        }
    },
})

export const {changeMobileMenuVisible} = appSlice.actions

export const appSelector = (state: StoreState) => state.app;

export default appSlice.reducer