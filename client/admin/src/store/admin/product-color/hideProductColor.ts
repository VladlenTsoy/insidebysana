import { ProductColor } from "../../../lib/types/product/ProductColor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminThunkProps } from "../store";
import { apiRequest } from "../../../utils/api";
import { message } from "../../../lib/ui";

type ReturnedType = ProductColor['id']

type ArgProps = ProductColor['id']

export const hideProductColor = createAsyncThunk<ReturnedType, ArgProps, AdminThunkProps>(
    "admin/product-colors/hide",
    async (productColorId)=> {
        //
        const response = await apiRequest("delete", `admin/product/${productColorId}/hide`)
        response && message({type: "success", content: "Вы успешно скрыли продукт!"})
        return response
    }
)