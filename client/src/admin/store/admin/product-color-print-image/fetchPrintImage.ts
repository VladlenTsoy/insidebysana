import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"

type ReturnedType = ProductColorPrint[]

type ArgProps = ProductColorPrint["product_color_id"]

export const fetchPrintImage = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-print-image/fetch",
    async (productColorId, {signal}) => {
        //
        return await apiRequest("get", `admin/product-color/${productColorId}/prints`, {signal})
    }
)