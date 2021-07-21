import {ProductColor} from "../../../types/product/ProductColor"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../../store/admin/store"
import {apiRequest} from "../../../../utils/api"
import {message} from "../../../ui"

type ReturnedType = ProductColor['id']

type ArgProps = ProductColor['id']

export const deleteProductColorFromTrash = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-colors/trash/delete",
    async (productColorId)=> {
        //
        const response = await apiRequest("delete", `admin/product/${productColorId}`)
        response && message({type: "success", content: "Вы успешно удалили продукт!"})
        return productColorId
    }
)