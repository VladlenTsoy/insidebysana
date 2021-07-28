import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import moment from "moment"
import {ArchiveOrder} from "../../../lib/types/Order"
import {AdminState} from "../store"
import {fetchOrdersArchive} from "./fetchOrdersArchive"

export const orderArchiveAdapter = createEntityAdapter<ArchiveOrder>({
    sortComparer: (a, b) => (a.id < b.id ? 1 : -1)
})

export interface StateProps {
    loading: boolean
    filterDates: {
        from: string
        to: string
    }
    sourceId: number
}

const initialState = orderArchiveAdapter.getInitialState<StateProps>({
    loading: false,
    filterDates: {
        from: moment().toISOString(),
        to: moment().toISOString()
    },
    sourceId: 0
})

const orderArchiveSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        updateFilterDates: (state, action: PayloadAction<{from: string; to: string}>) => {
            state.filterDates = action.payload
        },
        updateFilterSource: (state, action: PayloadAction<number>) => {
            state.sourceId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrdersArchive.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrdersArchive.fulfilled, (state, action) => {
            orderArchiveAdapter.removeAll(state)
            orderArchiveAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
    }
})

export const {updateFilterDates, updateFilterSource} = orderArchiveSlice.actions

export const {
    selectById: getOrderArchiveById,
    selectAll: selectAllOrdersAchive
} = orderArchiveAdapter.getSelectors<AdminState>(state => state.orderArchive)

export default orderArchiveSlice.reducer
