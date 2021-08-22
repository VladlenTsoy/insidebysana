import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Category} from "../../../lib/types/Category"

type ReturnedType = Category

interface AgrProps {
    title: Category["title"]
    category_id?: Category["id"]
}

export const createCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/category/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/category`, {data})
        response && message({type: "success", content: "Вы успешно создали категорию!"})
        return response
    }
)
