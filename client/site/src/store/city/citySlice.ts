import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {City} from "types/city"
import {StoreState} from "../store"
import {fetchCities} from "./fetchCities"

export const cityAdapter = createEntityAdapter<City>()

export interface StateProps {
    loading: boolean
}

const initialState = cityAdapter.getInitialState<StateProps>({
    loading: true
})

const citySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCities.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCities.fulfilled, (state, action) => {
            state.loading = false
            cityAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchCities.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllCities, selectById} = cityAdapter.getSelectors<StoreState>(state => state.city)

export default citySlice.reducer
