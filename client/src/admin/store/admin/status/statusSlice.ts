import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Status} from "../../../lib/types/Status"
import {StoreState} from "../../../store"
import {fetchStatuses} from "./fetchStatuses"
import {updatePositionStatus} from "./updatePositionStatus"
import {createStatus} from "./createStatus"
import {updateStatus} from "./updateStatus"

export const statusAdapter = createEntityAdapter<Status>({
    sortComparer: (a, b) => (a.position > b.position ? 1 : -1)
})

export interface StateProps {
    loading: boolean
}

const initialState = statusAdapter.getInitialState<StateProps>({
    loading: true
})

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {},
    extraReducers: builder => {
        //
        builder.addCase(createStatus.fulfilled, (state, action) => {
            statusAdapter.addOne(state, action.payload)
        })
        //
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            const {id} = action.meta.arg
            statusAdapter.updateOne(state, {id, changes: action.payload})
        })
        //
        builder.addCase(fetchStatuses.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchStatuses.fulfilled, (state, action) => {
            statusAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchStatuses.rejected, state => {
            state.loading = false
        })
        //
        builder.addCase(updatePositionStatus.pending, (state, action) => {
            const {position, prevPosition, id} = action.meta.arg
            const items = Object.values(state.entities).reduce((accumulator: any[], item: any) => {
                if (position < prevPosition) {
                    if (item.position >= position && item.position <= prevPosition && item.id !== id)
                        accumulator.push({id: item.id, changes: {position: item.position + 1}})
                } else if (position > prevPosition) {
                    if (item.position <= position && item.position >= prevPosition && item.id !== id)
                        accumulator.push({id: item.id, changes: {position: item.position - 1}})
                }
                return accumulator
            }, [])
            items.push({id, changes: {position, loading: true}})
            statusAdapter.updateMany(state, items)
        })
        builder.addCase(updatePositionStatus.fulfilled, (state, action) => {
            const {id} = action.meta.arg
            statusAdapter.updateOne(state, {id, changes: {loading: false}})
        })
        builder.addCase(updatePositionStatus.rejected, (state, action) => {
            const {id} = action.meta.arg
            statusAdapter.updateOne(state, {id, changes: {loading: false}})
        })
    }
})

export const {selectAll: selectAllStatuses} = statusAdapter.getSelectors<StoreState>(state => state.status)

export default statusSlice.reducer
