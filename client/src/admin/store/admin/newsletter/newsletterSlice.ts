import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Newsletter} from "../../../lib/types/Newsletter"
import {AdminState} from "../store"
import {fetchNewsletter} from "./fetchNewsletter"

export const newsletterAdapter = createEntityAdapter<Newsletter>()

export interface StateProps {
    loading: boolean
}

const initialState = newsletterAdapter.getInitialState<StateProps>({
    loading: true
})


const newsletterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNewsletter.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchNewsletter.fulfilled, (state, action) => {
            newsletterAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchNewsletter.rejected, state => {
            state.loading = false
        })
    }
})


export const {selectAll: selectAllNewsletter} = newsletterAdapter.getSelectors<AdminState>(
    state => state.newsletter
)

export default newsletterSlice.reducer
