import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {Product} from "../../../lib/types/product/Product"

type ReturnedType = {
    productColors: ProductColor[]
    product: Product
}

export const createProduct = createAsyncThunk<ReturnedType, any, AdminThunkProps>(
    "admin/product/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/product`, {data})
        response && message({type: "success", content: "Вы успешно создали продукт!"})
        return response
    }
)
