import {ProductColor} from "../../../lib/types/product/ProductColor"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"

type ReturnedType = {
    productColorId: ProductColor["id"]
    isNew: ProductColor["is_new"]
}

type ArgProps = {
    productColorId: ProductColor["id"]
    isNew: ProductColor["is_new"]
}

export const updateIsNewProductColor = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-colors/is-new",
    async ({productColorId, isNew}) => {
        //
        const response = await apiRequest("patch", `admin/product/${productColorId}/is-new`, {data: {isNew}})
        response && message({type: "success", content: "Вы успешно обновили товар!"})
        return {productColorId, isNew}
    }
)
