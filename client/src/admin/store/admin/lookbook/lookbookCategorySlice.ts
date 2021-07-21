import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {LookbookCategory} from "../../../lib/types/Lookbook"
import {AdminState} from "../store"
import {fetchLookbookCategories} from "./fetchLookbookCategories"
import {createLookbookCategory} from "./createLookbookCategory"
import {editLookbookCategory} from "./editLookbookCategory"
import {deleteLookbookCategory} from "./deleteLookbookCategory"

export const lookbookCategorydapter = createEntityAdapter<LookbookCategory>()

export interface StateProps {
    loading: boolean
}

const initialState = lookbookCategorydapter.getInitialState<StateProps>({
    loading: true
})

const lookbookSlice = createSlice({
    name: "lookbook-category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLookbookCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLookbookCategories.fulfilled, (state, action) => {
            lookbookCategorydapter.addMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchLookbookCategories.rejected, state => {
            state.loading = false
        })
        builder.addCase(createLookbookCategory.fulfilled, (state, action) => {
            lookbookCategorydapter.addOne(state, action.payload)
        })
        builder.addCase(editLookbookCategory.fulfilled, (state, action) => {
            lookbookCategorydapter.upsertOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deleteLookbookCategory.fulfilled, (state, action) => {
            lookbookCategorydapter.removeOne(state, action.payload)
        })
    }
})

export const {selectAll} = lookbookCategorydapter.getSelectors<AdminState>(state => state.lookbookCategory)

export default lookbookSlice.reducer
