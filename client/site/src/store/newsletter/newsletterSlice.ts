import {createSlice} from "@reduxjs/toolkit"
import {subscribeNewsletter} from "./subscribeNewsletter"
import {StoreState} from "../store"

export interface StateProps {
    subscribed: boolean
}

const initialState: StateProps = {
    subscribed: false
}

const newsletterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(subscribeNewsletter.pending, state => {
            state.subscribed = false
        })
        builder.addCase(subscribeNewsletter.fulfilled, state => {
            state.subscribed = true
        })
    }
})

export const newsletterSelector = (state: StoreState) => state.newsletter

export default newsletterSlice.reducer