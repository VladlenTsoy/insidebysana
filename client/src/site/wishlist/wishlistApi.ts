import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "types/cart"
import {apiRequest} from "../../utils/api"
import {Wishlist} from "types/wishlist"

export const addToWishlist = createAsyncThunk<ProductColorCart["id"], ProductColorCart["id"], ThunkProps>(
    "wishlist/add",
    (productColorId, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            apiRequest("post", `wishlist/add`, {type: "user", data: {productColorId}}).then()
        }
        return productColorId
    }
)

export const removeFromWishlist = createAsyncThunk<
    ProductColorCart["id"],
    ProductColorCart["id"],
    ThunkProps
>("wishlist/remove", (productColorId, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        apiRequest("post", `wishlist/remove`, {type: "user", data: {productColorId}}).then()
    }
    return productColorId
})

export const fetchWishlist = createAsyncThunk<
    {
        products: Wishlist[]
        productColorIds: Wishlist["product_color_id"][]
    },
    undefined,
    ThunkProps
>("wishlist/fetch", async (_, {signal, getState}) => {
    const {wishlist, auth} = getState()
    const productColorIds = wishlist.items
    if (auth.detail)
        return await apiRequest("post", `wishlist`, {type: "user", signal, data: {productColorIds}})
    return await apiRequest("post", `wishlist`, {type: "guest", signal, data: {productColorIds}})
})
