import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "../../types/cart"
import {apiRequest} from "../../utils/api"

type ReturnedType = {
    sku: ProductColorCart["sku"]
    qty: ProductColorCart["qty"]
}

type ArgsProps = ReturnedType

export const updateQtyCart = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "cart/update/qty", ({sku, qty}, {getState}) => {
        const {user} = getState()
        if (user.detail) {
            apiRequest("post", `cart/update/qty`, {type: "user", data: {sku, qty}})
                .then()
        }
        return {sku, qty}
    }
)