import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

type ReturnedType = ProductColorImage

interface ArgProps {
    productColorId: ProductColor["id"]
    data: any
}

export const uploadImage = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-image/upload",
    async ({productColorId, data}) => {
        //
        const response = await apiRequest(
            "post",
            `admin/product-color/${productColorId}/image/upload`,
            {data}
        )
        response && message({type: "success", content: "Вы добавили новую картинку!"})
        return response
    }
)
