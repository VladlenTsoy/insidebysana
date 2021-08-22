import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "../../../utils/api"
import {AdminThunkProps} from "../../../store"
import {ProductColor} from "../../types/product/ProductColor"

type ReturnedType = ProductColor[]

export const fetchProductColorsFromTrash = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/product-colors/fetch/trash",
    async (_, {signal}) => {
        return await apiRequest("post", `admin/product-colors/trash/table`, {signal})
    }
)
