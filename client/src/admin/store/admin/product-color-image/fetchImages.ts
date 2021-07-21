import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

type ReturnedType = ProductColorImage[]

type ArgProps = ProductColorImage["product_color_id"]

export const fetchImages = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-images/fetch",
    async (productColorId, {signal}) => {
        //
        return await apiRequest("get", `admin/product-color/${productColorId}/images`, {signal})
    }
)