import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {bannerApi} from "./home/bannerApi"
import {productApi} from "./products/productApi"
import {categoryApi} from "./layout/header/navigation/nav-desktop/products-menu/categories-menu/categoryApi"
import {lookbookApi} from "./lookbook/lookbookApi"
import {orderApi} from "./orders/orderApi"
import wishlist from "./wishlist/wishlistSlice"
import cart from "./cart/cartSlice"
import app from "./layout/appSlice"
import auth from "./auth/authSlice"
import product from "./products/productSlice"
import {deliveryApi} from "./cart/order/order-creation/left-block/delivery/deliveryApi"
import {additionalServiceApi} from "./cart/order/order-creation/left-block/additional-service/additionalServiceApi"
import {cityApi} from "./cart/order/order-creation/left-block/information/delivery-address/cityApi"
import {countryApi} from "./cart/order/order-creation/left-block/information/delivery-address/countryApi"
import {addressApi} from "./account/delivery-addresses/addressApi"
import {newsletterApi} from "./layout/footer/newsletter/newsletterApi"
import {measurementApi} from "./products/product/details/measurements/measurementApi"

export const store = configureStore({
    reducer: {
        [bannerApi.reducerPath]: bannerApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [lookbookApi.reducerPath]: lookbookApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [deliveryApi.reducerPath]: deliveryApi.reducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [newsletterApi.reducerPath]: newsletterApi.reducer,
        [measurementApi.reducerPath]: measurementApi.reducer,
        [additionalServiceApi.reducerPath]: additionalServiceApi.reducer,
        wishlist,
        app,
        cart,
        auth,
        product
    },
    middleware: [
        ...getDefaultMiddleware({immutableCheck: false})
            .concat(bannerApi.middleware)
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
            .concat(lookbookApi.middleware)
            .concat(orderApi.middleware)
            .concat(deliveryApi.middleware)
            .concat(cityApi.middleware)
            .concat(countryApi.middleware)
            .concat(addressApi.middleware)
            .concat(newsletterApi.middleware)
            .concat(measurementApi.middleware)
            .concat(additionalServiceApi.middleware)
    ]
})

export const useDispatch = () => useDefaultDispatch<any>()
export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}
