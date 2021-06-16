import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Wishlist} from "../../types/wishlist"
import {apiRequest} from "../../utils/api"

type ReturnedType = {
    products: Wishlist[]
    productColorIds: Wishlist["product_color_id"][]
}

type ArgsProps = undefined

export const fetchWishlist = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "wishlist/fetch",
    async (_, {signal, getState}) => {
        const {wishlist, user} = getState()
        const productColorIds = wishlist.items
        if (user.detail)
            return await apiRequest("post", `wishlist`, {type: "user", signal, data: {productColorIds}})
        return await apiRequest("post", `wishlist`, {type: "guest", signal, data: {productColorIds}})
    }
)
