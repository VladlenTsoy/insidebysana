import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import product from "./product/productSlice"
import productCard from "./product-card/productCardSlice"
import category from "./category/categorySlice"
import measurement from "./measurement/measurementSlice"
import newProduct from "./new-product/newProductSlice"
import banner from "./banner/bannerSlice"
import cart from "./cart/cartSlice"
import wishlist from "./wishlist/wishlistSlice"
import app from "./app/appSlice"
import user from "./user/userSlice"
import lookbook from "./lookbook/lookbookSlice"
import newsletter from "./newsletter/newsletterSlice"
import order from "./order/orderSlice"
import address from "./address/addressSlice"
import country from "./country/countrySlice"
import city from "./city/citySlice"
import additionalService from "./additional-service/additionalServiceSlice"

export const rootReducer = combineReducers({
    app,
    user,
    measurement,
    product,
    banner,
    category,
    productCard,
    newProduct,
    cart,
    wishlist,
    lookbook,
    newsletter,
    order,
    address,
    country,
    city,
    additionalService
})

export type StoreState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}

export const useDispatch = () => useDefaultDispatch<AppDispatch>()

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
})
