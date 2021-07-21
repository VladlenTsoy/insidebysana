import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {orderApi} from "./orders/orderApi"
import {categoryApi} from "./home/search-products/category-select/categoryApi"
import {sizeApi} from "./home/search-products/size-select/sizeApi"
import {additionalServiceApi} from "./home/added-products/actions-block/additional-services-action/additionalServiceApi"
import {paymentMethodApi} from "./orders/paymentMethodsApi"
import pos from "./home/posSlice"
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
        auth
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
