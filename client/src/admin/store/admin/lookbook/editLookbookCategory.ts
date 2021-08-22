import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {LookbookCategory} from "../../../lib/types/Lookbook"

type ReturnedType = LookbookCategory

interface AgrProps {
    id: LookbookCategory["id"]
    data: {
        title: LookbookCategory["title"]
        url_image: LookbookCategory["url_image"]
    }
}

export const editLookbookCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook-category/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/lookbook-category/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили категорию для lookbook!"})
        return response
    }
)
