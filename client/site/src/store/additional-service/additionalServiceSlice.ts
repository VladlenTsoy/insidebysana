import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {AdditionalService} from "types/additionalService"
import {StoreState} from "../store"
import {fetchAdditionalServices} from "./fetchAdditionalServices"

export const additionalServiceAdapter = createEntityAdapter<AdditionalService>()

export interface StateProps {
    loading: boolean
}

const initialState = additionalServiceAdapter.getInitialState<StateProps>({
    loading: true
})

const additionalServiceSlice = createSlice({
    name: "additional-service",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех
        builder.addCase(fetchAdditionalServices.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAdditionalServices.fulfilled, (state, action) => {
            additionalServiceAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchAdditionalServices.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllAdditionalServices} = additionalServiceAdapter.getSelectors<StoreState>(
    state => state.additionalService
)

export default additionalServiceSlice.reducer
