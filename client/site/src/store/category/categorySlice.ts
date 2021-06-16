import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Category} from "../../types/category"
import {StoreState} from "../store"
import {fetchCategories} from "./fetchCategories"

export const categoryAdapter = createEntityAdapter<Category>()

export interface StateProps {
    loading: boolean
}

const initialState = categoryAdapter.getInitialState<StateProps>({
    loading: true
})


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false
            categoryAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchCategories.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllCategories} = categoryAdapter.getSelectors<StoreState>(state => state.category)

export default categorySlice.reducer