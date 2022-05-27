import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {AdminThunkProps} from "../../../store"
import {ProductStorage} from "types/product/ProductStorage"

type ReturnedType = ProductStorage

interface AgrProps {
    title: ProductStorage["title"]
}

export const createProductStorage = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/product-storage/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/product-storage`, {data})
        response && message({type: "success", content: "Вы успешно добавили место хранения!"})
        return response
    }
)
