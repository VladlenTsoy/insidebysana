import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

type ReturnedType = ProductColorImage["id"]

type ArgProps = ProductColorImage["id"]

export const deleteImage = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-image/delete",
    async (id, {signal}) => {
        //
        await apiRequest("delete", `admin/product-color-image/${id}`, {signal})
        return id
    }
)
