import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"

type ReturnedType = ProductColorPrint["id"]

type ArgProps = ProductColorPrint["id"]

export const deletePrintImage = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-print-image/delete",
    async (id, {signal}) => {
        //
        await apiRequest("delete", `admin/product-color-print/${id}`, {signal})
        return id
    }
)
