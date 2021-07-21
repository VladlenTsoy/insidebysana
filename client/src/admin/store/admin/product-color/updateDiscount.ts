import {ProductColor} from "../../../lib/types/product/ProductColor"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"

type ReturnedType = ProductColor

interface ArgProps {
    productColorId: ProductColor['id']
    data: {
        discount: ProductColor['discount']['discount']
        end_at: ProductColor['discount']['end_at']
    }
}

export const updateDiscount = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-colors/discount/update",
    async ({productColorId, data})=> {
        //
        const response = await apiRequest("post", `admin/product/${productColorId}/discount`, {data})
        response && message({type: "success", content: "Вы успешно обновили скидку!"})
        return response
    }
)