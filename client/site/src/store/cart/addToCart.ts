import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "../../types/cart"
import {apiRequest} from "../../utils/api"

type ReturnedType = ProductColorCart["sku"]

type ArgsProps = ProductColorCart["sku"]

export const addToCart = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "cart/add", (sku, {getState}) => {
        const {user} = getState()
        if (user.detail) {
            apiRequest("post", `cart/add`, {type: "user", data: {sku}})
                .then()
        }
        return sku
    }
)