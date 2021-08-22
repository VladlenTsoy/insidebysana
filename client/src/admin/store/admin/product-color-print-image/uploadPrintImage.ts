import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"

type ReturnedType = ProductColorPrint

interface ArgProps {
    productColorId: ProductColor["id"]
    data: any
}

export const uploadPrintImage = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-color-print-image/upload",
    async ({productColorId, data}) => {
        //
        const response = await apiRequest(
            "post",
            `admin/product-color/${productColorId}/print/upload`,
            {data}
        )
        response && message({type: "success", content: "Вы добавили новую картинку!"})
        return response
    }
)
