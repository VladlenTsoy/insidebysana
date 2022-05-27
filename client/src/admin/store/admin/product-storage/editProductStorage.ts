import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {ProductStorage} from "../../../../types/product/ProductStorage"

type ReturnedType = ProductStorage

interface AgrProps {
    id: ProductStorage["id"]
    data: {
        title: ProductStorage["title"]
    }
}

export const editProductStorage = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/product-storage/edit",
    async ({ id, data }) => {
        //
        const response = await apiRequest("patch", `admin/product-storage/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили место хранения!"})
        return response
    }
)
