import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import app from "./app/appSlice"
import user from "./user/userSlice"
import size from "./size/sizeSlice"
import category from "./category/categorySlice"
import additionalService from "./additional-service/additionalServiceSlice"
import {useDispatch} from "react-redux"

export type CommonState = ReturnType<typeof commonReducer>

export const commonReducer = combineReducers({
    app,
    user,
    size,
    category,
    additionalService
})

export type AppDispatch = typeof store.dispatch

export interface CommonThunkProps {
    dispatch: AppDispatch
    state: CommonState
    extra?: unknown
    rejectValue?: unknown
}

export const useCommonDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: commonReducer,
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
})
