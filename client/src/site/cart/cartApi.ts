import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "types/cart"
import {apiRequest} from "utils/api"

export const addToCart = createAsyncThunk<ProductColorCart["sku"], ProductColorCart["sku"], ThunkProps>(
    "cart/add",
    (sku, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            apiRequest("post", `cart/add`, {type: "user", data: {sku}}).then()
        }
        return sku
    }
)

export const clearCart = createAsyncThunk<[], undefined, ThunkProps>("cart/clear", (_, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        apiRequest("post", `cart/clear`, {type: "user"}).then()
    }
    return []
})

export const fetchCart = createAsyncThunk<
    {
        skus: ProductColorCart["sku"][]
        products: ProductColorCart[]
    },
    undefined,
    ThunkProps
>("cart/fetch", async (_, {signal, getState}) => {
    const {auth, cart} = getState()
    if (auth.detail) return await apiRequest("post", `cart`, {type: "user", signal, data: {skus: cart.skus}})
    return await apiRequest("post", `cart`, {type: "guest", signal, data: {skus: cart.skus}})
})

export const removeFromCart = createAsyncThunk<ProductColorCart["sku"], ProductColorCart["sku"], ThunkProps>(
    "cart/remove",
    (sku, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            apiRequest("post", `cart/remove`, {type: "user", data: {sku}}).then()
        }
        return sku
    }
)

export const updateQtyCart = createAsyncThunk<
    {
        sku: ProductColorCart["sku"]
        qty: ProductColorCart["qty"]
    },
    {
        sku: ProductColorCart["sku"]
        qty: ProductColorCart["qty"]
    },
    ThunkProps
>("cart/update/qty", ({sku, qty}, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        apiRequest("post", `cart/update/qty`, {type: "user", data: {sku, qty}}).then()
    }
    return {sku, qty}
})
