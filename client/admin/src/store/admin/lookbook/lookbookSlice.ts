import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Lookbook} from "../../../lib/types/Lookbook"
import {AdminState} from "../store"
import {fetchLookbook} from "./fetchLookbook"
import {createLookbook} from "./createLookbook"
import {editLookbook} from "./editLookbookts"
import {deleteLookbook} from "./deleteLookbook"

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
        builder.addCase(createLookbook.fulfilled, (state, action) => {
            lookbookAdapter.addOne(state, action.payload)
        })
        builder.addCase(editLookbook.fulfilled, (state, action) => {
            lookbookAdapter.upsertOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deleteLookbook.fulfilled, (state, action) => {
            lookbookAdapter.removeOne(state, action.payload)
        })
    }
})

export const {selectAll: selectAllLookbook} = lookbookAdapter.getSelectors<AdminState>(state => state.lookbook)

export default lookbookSlice.reducer