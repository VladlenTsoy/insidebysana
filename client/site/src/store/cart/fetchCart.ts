import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "../../types/cart"
import {apiRequest} from "../../utils/api"

type ReturnedType = {
    skus: ProductColorCart["sku"][]
    products: ProductColorCart[]
}

type ArgsProps = undefined

export const fetchCart = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "cart/fetch",
    async (_, {signal, getState}) => {
        const {user, cart} = getState()
        if (user.detail)
            return await apiRequest("post", `cart`, {type: "user", signal, data: {skus: cart.skus}})
        return await apiRequest("post", `cart`, {type: "guest", signal, data: {skus: cart.skus}})
    }
)