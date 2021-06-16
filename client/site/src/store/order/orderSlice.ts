import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Order} from "../../types/order"
import {StoreState} from "../store"
import {fetchOrders} from "./fetchOrders"

export const orderAdapter = createEntityAdapter<Order>()

export interface StateProps {
    loading: boolean
}

const initialState = orderAdapter.getInitialState<StateProps>({
    loading: false
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            orderAdapter.addMany(state, action.payload)
            state.loading = false
        })
    }
})

export const {selectAll: selectAllOrders} = orderAdapter.getSelectors<StoreState>(state => state.order)

export default orderSlice.reducer
