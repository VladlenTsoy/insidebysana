import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {apiRequest} from "../../utils/api"

type ReturnedType = []

export const clearCart = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "cart/clear",
    (_, {getState}) => {
        const {user} = getState()
        if (user.detail) {
            apiRequest("post", `cart/clear`, {type: "user"}).then()
        }
        return []
    }
)
