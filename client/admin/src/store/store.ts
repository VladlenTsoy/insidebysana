import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import user from "./common/user/userSlice"
import app from "./common/app/appSlice"
import size from "./common/size/sizeSlice"
import category from "./common/category/categorySlice"

export const rootReducer = combineReducers({
    user,
    app,
    size,
    category
})
export type StoreState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
})
