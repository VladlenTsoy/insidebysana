import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"

type ReturnedType = any

type ArgsProps = string | number

export const fetchProductById = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/product/fetch/id",
    async (id, {signal}) => {
        //
        return await apiRequest("get", `admin/product/${id}`, {signal})
    },
    {
        condition(id, {getState}) {
            const {product} = getState()
            return !product.ids.includes(id)
        }
    }
)
