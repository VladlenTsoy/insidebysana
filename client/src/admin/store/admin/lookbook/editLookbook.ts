import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Lookbook} from "../../../lib/types/Lookbook"

type ReturnedType = Lookbook

interface AgrProps {
    id: Lookbook["id"]
    data: {
        url_image: Lookbook["url_image"]
        position: Lookbook["position"]
        category_id: Lookbook["category_id"]
    }
}

export const editLookbook = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/lookbook/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/lookbook/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили lookbook!"})
        return response
    }
)
