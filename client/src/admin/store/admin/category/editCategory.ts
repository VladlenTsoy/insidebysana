import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Category} from "../../../lib/types/Category"

type ReturnedType = Category

interface AgrProps {
    id: Category["id"]
    data: {
        title: Category["title"]
        category_id?: Category["id"]
        hide_id?: Category["hide_id"]
    }
}

export const editCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/category/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/category/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили категорию!"})
        return response
    }
)
