import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {productApi} from "./print-product/productApi"

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: [...getDefaultMiddleware({immutableCheck: false}).concat(productApi.middleware)]
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
