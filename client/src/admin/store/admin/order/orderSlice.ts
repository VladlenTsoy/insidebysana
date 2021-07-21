import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Order} from "../../../lib/types/Order"
import {AdminState} from "../store"
import {fetchOrders} from "./fetchOrders"
import {updateStatusOrder} from "./updateStatusOrder"
import {createOrder} from "./createOrder"
import {fetchOrderById} from "./fetchOrderById"
import {changePaymentStateOrder} from "./changePaymentStateOrder"
import {cancelOrder} from "./cancelOrder"
import {editOrder} from "./editOrder"

export const orderAdapter = createEntityAdapter<Order>({
    sortComparer: (a, b) => (a.position > b.position ? 1 : -1)
})

export interface StateProps {
    loading: boolean
}

const initialState = orderAdapter.getInitialState<StateProps>({
    loading: false
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            orderAdapter.addOne(state, action.payload)
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            orderAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            orderAdapter.addOne(state, action.payload)
        })
        //
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            const {orderId, paymentState} = action.payload
            orderAdapter.updateOne(state, {id: orderId, changes: {payment_state: paymentState}})
        })
        //
        builder.addCase(changePaymentStateOrder.fulfilled, (state, action) => {
            const {orderId, paymentState} = action.payload
            orderAdapter.updateOne(state, {id: orderId, changes: {payment_state: paymentState}})
        })
        // Вывод сделки
        builder.addCase(fetchOrders.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            orderAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchOrders.rejected, state => {
            state.loading = false
        })
        // Создать сделку
        builder.addCase(createOrder.fulfilled, (state, action) => {
            orderAdapter.addOne(state, action.payload)
        })
        // Обновить сделку
        builder.addCase(editOrder.fulfilled, (state, action) => {
            orderAdapter.upsertOne(state, action.payload)
        })
        // Обновить статус и позицию
        builder.addCase(updateStatusOrder.pending, (state, action) => {
            const {id, nextStatusId, prevStatusId, prevPosition, position} = action.meta.arg
            const isStatusChange = nextStatusId !== prevStatusId

            const items = Object.values(state.entities).reduce((accumulator: any[], item: any) => {
                if (isStatusChange) {
                    if (item.position >= position && item.id !== id && item.status_id === nextStatusId)
                        accumulator.push({id: item.id, changes: {position: item.position + 1}})
                    else if (
                        item.status_id === prevStatusId &&
                        item.id !== id &&
                        item.position >= prevPosition
                    )
                        accumulator.push({id: item.id, changes: {position: item.position - 1}})
                } else {
                    if (position < prevPosition) {
                        if (
                            item.position >= position &&
                            item.position <= prevPosition &&
                            item.id !== id &&
                            item.status_id === nextStatusId
                        )
                            accumulator.push({id: item.id, changes: {position: item.position + 1}})
                    } else if (position > prevPosition) {
                        if (
                            item.position <= position &&
                            item.position >= prevPosition &&
                            item.id !== id &&
                            item.status_id === nextStatusId
                        )
                            accumulator.push({id: item.id, changes: {position: item.position - 1}})
                    }
                }
                return accumulator
            }, [])

            items.push({id, changes: {loading: true, position, next_status_id: nextStatusId}})
            orderAdapter.updateMany(state, items)
        })
        builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
            const {id, nextStatusId, position} = action.meta.arg
            orderAdapter.updateOne(state, {
                id,
                changes: {loading: false, position, next_status_id: undefined, status_id: nextStatusId}
            })
        })
        builder.addCase(updateStatusOrder.rejected, (state, action) => {
            const {id, prevStatusId, prevPosition} = action.meta.arg
            orderAdapter.updateOne(state, {
                id,
                changes: {
                    loading: false,
                    next_status_id: undefined,
                    status_id: prevStatusId,
                    position: prevPosition
                }
            })
        })
    }
})

export const {addOrder, updateOrder} = orderSlice.actions

export const {selectById: getOrderById, selectAll: selectAllOrders} = orderAdapter.getSelectors<AdminState>(
    state => state.order
)

export default orderSlice.reducer
