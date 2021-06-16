import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {ProductColorCart} from "../../types/cart"
import {apiRequest} from "../../utils/api"

type ReturnedType = ProductColorCart["id"]

type ArgsProps = ProductColorCart["id"]

export const removeFromWishlist = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "wishlist/remove", (productColorId, {getState}) => {
        const {user} = getState()
        if (user.detail) {
            apiRequest("post", `wishlist/remove`, {type: "user", data: {productColorId}})
                .then()
        }
        return productColorId
    }
)