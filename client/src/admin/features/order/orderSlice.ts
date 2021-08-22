import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {OrderCardType} from "./Order"
import {StoreState} from "../../store"
import {fetchOrders} from "../../store/admin/order/fetchOrders"
import {updateStatusOrder} from "../../store/admin/order/updateStatusOrder"
// import {createOrder} from "../../store/admin/order/createOrder"
// import {fetchOrderById} from "../../store/admin/order/fetchOrderById"
import {changePaymentStateOrder} from "../../store/admin/order/changePaymentStateOrder"
import {cancelOrder} from "../../store/admin/order/cancelOrder"
// import {editOrder} from "../../store/admin/order/editOrder"
import {hideOrder} from "./order-card/hideOrder"
import {sendToArchiveOrder} from "./order-card/sendToArchiveOrder"

export const orderAdapter = createEntityAdapter<OrderCardType>({
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
        addOrder: (state, action: PayloadAction<OrderCardType>) => {
            orderAdapter.addOne(state, action.payload)
        },
        updateOrder: (state, action: PayloadAction<OrderCardType>) => {
            orderAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        // builder.addCase(fetchOrderById.fulfilled, (state, action) => {
        //     orderAdapter.addOne(state, action.payload)
        // })
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
        // builder.addCase(createOrder.fulfilled, (state, action) => {
        //     orderAdapter.addOne(state, action.payload)
        // })
        // // Обновить сделку
        // builder.addCase(editOrder.fulfilled, (state, action) => {
        //     orderAdapter.upsertOne(state, action.payload)
        // })
        //
        builder.addCase(sendToArchiveOrder.fulfilled, (state, action) => {
            orderAdapter.removeOne(state, action.payload)
        })
        // Отправить сделку в корзину
        builder.addCase(hideOrder.fulfilled, (state, action) => {
            orderAdapter.removeOne(state, action.payload)
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
                changes: {position, status_id: nextStatusId}
            })
        })
    }
})

export const {addOrder, updateOrder} = orderSlice.actions

export const {selectById: getOrderById, selectAll: selectAllOrders} = orderAdapter.getSelectors<StoreState>(
    state => state.order
)

export default orderSlice.reducer
