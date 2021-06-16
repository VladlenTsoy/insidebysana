import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Category} from "../../../lib/types/Category"

type ReturnedType = Category[]

type AgrProps = Category["id"]

export const deleteCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/category/delete",
    async categoryId => {
        //
        const response = await apiRequest("delete", `admin/category/${categoryId}`)
        response && message({type: "success", content: "Вы успешно удалили категорию!"})
        return response
    }
)
