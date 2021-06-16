import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import app from "../common/app/appSlice"
import user from "../common/user/userSlice"
import category from "../common/category/categorySlice"
import size from "../common/size/sizeSlice"
import additionalService from "../common/additional-service/additionalServiceSlice"
import order from "./order/orderSlice"
import pos from "./pos/posSlice"
import paymentMethod from "./payment-method/paymentMethodSlice"

export type CashierState = ReturnType<typeof cashierReducer>

export const cashierReducer = combineReducers({
    // common
    app,
    user,
    size,
    category,
    additionalService,
    // Cashier
    order,
    pos,
    paymentMethod
})

export type AppDispatch = typeof store.dispatch

export interface CashierThunkProps {
    dispatch: AppDispatch
    state: CashierState
    extra?: unknown
    rejectValue?: unknown
}

export const useCashierDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: cashierReducer,
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
})
