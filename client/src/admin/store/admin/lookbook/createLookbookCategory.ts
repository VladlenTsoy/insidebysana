import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {LookbookCategory} from "../../../lib/types/Lookbook"

type ReturnedType = LookbookCategory

interface AgrProps {
    title: LookbookCategory["title"]
    image: LookbookCategory["url_image"]
}

export const createLookbookCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook-category/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/lookbook-category`, {data})
        response && message({type: "success", content: "Вы успешно добавили категорию для lookbook!"})
        return response
    }
)
