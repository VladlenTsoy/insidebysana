import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Country} from "types/country"
import {StoreState} from "../store"
import {fetchCountries} from "./fetchCountries"

export const categoryAdapter = createEntityAdapter<Country>()

export interface StateProps {
    loading: boolean
}

const initialState = categoryAdapter.getInitialState<StateProps>({
    loading: true
})

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCountries.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.loading = false
            categoryAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchCountries.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllCountries, selectById} = categoryAdapter.getSelectors<StoreState>(
    state => state.country
)

export default countrySlice.reducer
