import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {StoreState} from "../../../store"
import {fetchPaymentMethods} from "./fetchPaymentMethods"
import {PaymentMethod} from "../../../lib/types/payment/PaymentMethod"

export const paymentMethodAdapter = createEntityAdapter<PaymentMethod>()

export interface StateProps {
    loading: boolean
}

const initialState = paymentMethodAdapter.getInitialState<StateProps>({
    loading: true
})

const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех
        builder.addCase(fetchPaymentMethods.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
            paymentMethodAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchPaymentMethods.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    selectAll: selectAllPaymentMethods
} = paymentMethodAdapter.getSelectors<StoreState>(state => state.paymentMethod)

export default paymentMethodSlice.reducer