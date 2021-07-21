import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {LookbookCategory} from "../../../lib/types/Lookbook"

type ReturnedType = LookbookCategory["id"]

type AgrProps = LookbookCategory["id"]

export const deleteLookbookCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook-category/delete",
    async id => {
        //
        const response = await apiRequest("delete", `admin/lookbook-category/${id}`)
        response && message({type: "success", content: "Вы успешно удалили категорию для lookbook!"})
        return id
    }
)
