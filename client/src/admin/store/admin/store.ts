import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import app from "../common/app/appSlice"
import user from "../common/user/userSlice"
import color from "./color/colorSlice"
import size from "../common/size/sizeSlice"
import tag from "./tag/tagSlice"
import category from "../common/category/categorySlice"
import product from "./product/productSlice"
import client from "./client/clientSlice"
import source from "./source/sourceSlice"
import productColor from "./product-color/productColorSlice"
import banner from "./banner/bannerSlice"
import additionalService from "../common/additional-service/additionalServiceSlice"
import status from "./status/statusSlice"
import order from "./order/orderSlice"
import staff from "./staff/staffSlice"
import paymentMethod from "./payment-method/paymentMethodSlice"
import print from "./product-color-print-image/productColorPrintSlice"
import lookbook from "./lookbook/lookbookSlice"
import orderArchive from "./order-archive/orderArchiveSlice"
import newsletter from "./newsletter/newsletterSlice"
import promoCode from "./promo-code/promoCodeSlice"
import printCategory from "./print-category/printCategorySlice"
import printImage from "./print-image/printImageSlice"
import printProduct from "./print-product/printProductSlice"
import productColorImage from "./product-color-image/productColorImageSlice"
import trashProductColor from "admin/lib/components/trash-products/trashProductColorSlice"

export type AdminState = ReturnType<typeof adminReducer>

export const adminReducer = combineReducers({
    // common
    app,
    user,
    category,
    size,
    // Admin
    color,
    additionalService,
    tag,
    product,
    client,
    source,
    productColor,
    banner,
    status,
    order,
    staff,
    paymentMethod,
    print,
    lookbook,
    newsletter,
    promoCode,
    productColorImage,
    trashProductColor,
    orderArchive,
    printCategory,
    printImage,
    printProduct
})

export type AppDispatch = typeof store.dispatch

export interface AdminThunkProps {
    dispatch: AppDispatch
    state: AdminState
    extra?: unknown
    rejectValue?: unknown
}

export const useAdminDispatch = () => useDispatch<any>()

export const store = configureStore({
    reducer: adminReducer,
    middleware: [...getDefaultMiddleware({immutableCheck: false})]
})
