import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import app from "./store/common/app/appSlice"
import user from "./store/common/user/userSlice"
import color from "./store/admin/color/colorSlice"
import size from "./store/common/size/sizeSlice"
import tag from "./store/admin/tag/tagSlice"
import category from "./store/common/category/categorySlice"
import product from "./store/admin/product/productSlice"
import client from "./store/admin/client/clientSlice"
import source from "./store/admin/source/sourceSlice"
import productColor from "./store/admin/product-color/productColorSlice"
import banner from "./store/admin/banner/bannerSlice"
import additionalService from "./store/common/additional-service/additionalServiceSlice"
import status from "./store/admin/status/statusSlice"
import order from "./features/order/orderSlice"
import staff from "./store/admin/staff/staffSlice"
import paymentMethod from "./store/admin/payment-method/paymentMethodSlice"
import print from "./store/admin/product-color-print-image/productColorPrintSlice"
import lookbook from "./store/admin/lookbook/lookbookSlice"
import lookbookCategory from "./store/admin/lookbook/lookbookCategorySlice"
import orderArchive from "./store/admin/order-archive/orderArchiveSlice"
import newsletter from "./store/admin/newsletter/newsletterSlice"
import promoCode from "./store/admin/promo-code/promoCodeSlice"
import printCategory from "./store/admin/print-category/printCategorySlice"
import printImage from "./store/admin/print-image/printImageSlice"
import printProduct from "./store/admin/print-product/printProductSlice"
import productColorImage from "./store/admin/product-color-image/productColorImageSlice"
import trashProductColor from "admin/lib/components/trash-products/trashProductColorSlice"
import homeProduct from "./pages/user/admin/pages/settings/home/homeProductSlice"
import {productApi} from "admin/features/product/productApi"
import {categoryApi} from "admin/features/category/categoryApi"
import {colorApi} from "admin/features/color/colorApi"
import {sizeApi} from "admin/features/size/sizeApi"
import {tagApi} from "admin/features/tag/tagApi"
import {homePositionApi} from "admin/features/home-position/homePositionApi"
import {photoApi} from "./features/product/product-editor/photos-section/photoApi"

export type StoreState = ReturnType<typeof adminReducer>

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
    printProduct,
    homeProduct,
    lookbookCategory,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [homePositionApi.reducerPath]: homePositionApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer
})

export type AppDispatch = typeof store.dispatch

export interface AdminThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}

export const useAdminDispatch = () => useDispatch<any>()

export const store = configureStore({
    reducer: adminReducer,
    middleware: [
        ...getDefaultMiddleware({immutableCheck: false})
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
            .concat(colorApi.middleware)
            .concat(sizeApi.middleware)
            .concat(tagApi.middleware)
            .concat(homePositionApi.middleware)
            .concat(photoApi.middleware)
    ]
})
