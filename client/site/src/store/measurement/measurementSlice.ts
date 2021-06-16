import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Measurement} from "../../types/measurement"
import {StoreState} from "../store"
import {fetchMeasurements} from "./fetchMeasurements"

export const measurementAdapter = createEntityAdapter<Measurement>({
    selectId: (measurement) => measurement.product_id,
})

export interface StateProps {
    loading: boolean
}

const initialState = measurementAdapter.getInitialState<StateProps>({
    loading: true
})


const measurementSlice = createSlice({
    name: "measurement",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMeasurements.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchMeasurements.fulfilled, (state, action) => {
            measurementAdapter.addOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchMeasurements.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectById: getMeasurementById} =
    measurementAdapter.getSelectors<StoreState>(state => state.measurement)

export default measurementSlice.reducer