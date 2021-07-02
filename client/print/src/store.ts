import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {productApi} from "./print-products/productApi"
import {categoryApi} from "./layout/categoryApi"
import {printImageApi} from "./print-images/printImageApi"
import {homeApi} from "./home/homeApi"
import cart from "./cart/cartSlice"

export const store = configureStore({
    reducer: {
        [homeApi.reducerPath]: homeApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [printImageApi.reducerPath]: printImageApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        cart
    },
    middleware: [
        ...getDefaultMiddleware({immutableCheck: false})
            .concat(homeApi.middleware)
            .concat(productApi.middleware)
            .concat(printImageApi.middleware)
            .concat(categoryApi.middleware)
    ]
})

export const useDispatch = () => useDefaultDispatch<AppDispatch>()
export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}
