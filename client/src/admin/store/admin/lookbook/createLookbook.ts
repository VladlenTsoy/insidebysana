import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Lookbook} from "../../../lib/types/Lookbook"

type ReturnedType = Lookbook

interface AgrProps {
    image: Lookbook["url_image"]
    position: Lookbook["position"]
    category_id: Lookbook["category_id"]
}

export const createLookbook = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/lookbook`, {data})
        response && message({type: "success", content: "Вы успешно добавили lookbook!"})
        return response
    }
)
