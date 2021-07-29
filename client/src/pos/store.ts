import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {orderApi} from "./features/order/orderApi"
import {categoryApi} from "./layouts/header/categoryApi"
import {sizeApi} from "./layouts/header/sizeApi"
import {additionalServiceApi} from "./features/additional-services/additionalServiceApi"
import {paymentMethodApi} from "./features/order/orders-list/paymentMethodsApi"
import pos from "./home/posSlice"
import product from "./features/product/productSlice"
import cart from "./features/cart/cartSlice"
import auth from "./auth/authSlice"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [orderApi.reducerPath]: orderApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [sizeApi.reducerPath]: sizeApi.reducer,
        [additionalServiceApi.reducerPath]: additionalServiceApi.reducer,
        [paymentMethodApi.reducerPath]: paymentMethodApi.reducer,
        pos,
        auth,
        cart,
        product
    },
    middleware: [
        ...getDefaultMiddleware({immutableCheck: false})
            .concat(orderApi.middleware)
            .concat(categoryApi.middleware)
            .concat(sizeApi.middleware)
            .concat(additionalServiceApi.middleware)
            .concat(paymentMethodApi.middleware)
    ]
})

setupListeners(store.dispatch)
export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}
// TODO - ошибка any
export const useDispatch = () => useDefaultDispatch<any>()
