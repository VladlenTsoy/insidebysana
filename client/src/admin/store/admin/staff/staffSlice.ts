import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {StoreState} from "../../../store"
import {User} from "../../../lib/types/User"
import {fetchStaff} from "./fetchStaff"
import {createStaff} from "./createStaff"
import {editStaff} from "./editStaff"

export const staffAdapter = createEntityAdapter<User>()

export interface StateProps {
    loading: boolean
}

const initialState = staffAdapter.getInitialState<StateProps>({
    loading: true
})

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
    extraReducers: builder => {
        //
        builder.addCase(fetchStaff.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStaff.fulfilled, (state, action) => {
            staffAdapter.setAll(state, action.payload.results)
            state.loading = false
        })
        builder.addCase(fetchStaff.rejected, state => {
            state.loading = false
        })
        //
        builder.addCase(createStaff.pending, state => {
            state.loading = true
        })
        builder.addCase(createStaff.fulfilled, (state, action) => {
            staffAdapter.addOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(createStaff.rejected, state => {
            state.loading = false
        })
        //
        builder.addCase(editStaff.pending, state => {
            state.loading = true
        })
        builder.addCase(editStaff.fulfilled, (state, action) => {
            staffAdapter.upsertOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(editStaff.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllStaff} = staffAdapter.getSelectors<StoreState>(state => state.staff)

export default staffSlice.reducer
