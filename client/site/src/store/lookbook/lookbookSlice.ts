import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {StoreState} from "../store"
import {fetchLookbook} from "./fetchLookbook"
import {Lookbook} from "../../types/lookbook"

export const lookbookAdapter = createEntityAdapter<Lookbook>()

export interface StateProps {
    loading: boolean
}

const initialState = lookbookAdapter.getInitialState<StateProps>({
    loading: true
})

const lookbookSlice = createSlice({
    name: "lookbook",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLookbook.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLookbook.fulfilled, (state, action) => {
            lookbookAdapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchLookbook.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllLookbook} =
    lookbookAdapter.getSelectors<StoreState>(state => state.lookbook)

export default lookbookSlice.reducer