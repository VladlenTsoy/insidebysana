import {ProductColor} from "../../../lib/types/product/ProductColor"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Product} from "../../../lib/types/product/Product"

type ReturnedType = {
    productColors: ProductColor[]
    product: Product
}

interface AgrProps {
    data: any
    productId: ProductColor["id"]
}

export const editProduct = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/product/edit",
    async ({productId, data}) => {
        //
        const response = await apiRequest("post", `admin/product/${productId}`, {data})
        response && message({type: "success", content: "Вы успешно изменили продукт!"})
        return response
    }
)
