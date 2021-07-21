import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {OrderPos} from "../../../lib/types/Order"
import {CashierState} from "../store"
import {createPosOrder} from "./createPosOrder"
import {fetchOrders} from "./fetchOrders"
import moment from "moment"

export const orderAdapter = createEntityAdapter<OrderPos>({
    sortComparer: (a, b) => (a.id < b.id ? 1 : -1)
})

export interface StateProps {
    loading: boolean
    filterDates: {
        from: string
        to: string
    }
}

const initialState = orderAdapter.getInitialState<StateProps>({
    loading: false,
    filterDates: {
        from: moment().toISOString(),
        to: moment().toISOString()
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        updateFilterDates: (state, action: PayloadAction<{from: string; to: string}>) => {
            state.filterDates = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            orderAdapter.removeAll(state)
            orderAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(createPosOrder.fulfilled, (state, action) => {
            orderAdapter.addOne(state, action.payload)
        })
    }
})

export const {updateFilterDates} = orderSlice.actions

export const {selectById: getOrderById, selectAll: selectAllOrders} = orderAdapter.getSelectors<CashierState>(
    state => state.order
)

export default orderSlice.reducer
