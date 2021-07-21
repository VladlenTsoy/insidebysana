import {ProductColor} from "../../../types/product/ProductColor"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../../store/admin/store"
import {apiRequest} from "../../../../utils/api"
import {message} from "../../../ui"

type ReturnedType = ProductColor['id']

type ArgProps = ProductColor['id']

export const returnProductColorFromTrash = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-colors/trash/return",
    async (productColorId)=> {
        //
        const response = await apiRequest("post", `admin/product/${productColorId}/return`)
        response && message({type: "success", content: "Вы успешно вернули продукт!"})
        return productColorId
    }
)