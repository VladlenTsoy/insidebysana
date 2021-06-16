import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {apiRequest} from "../../utils/api"
import {ProductColorCard} from "../../types/productColor"

type ReturnedType = ProductColorCard[]

type ArgsProps = undefined

export const fetchNewProducts = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "new-product/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `new-products`, {type: "guest", signal})
    }
)