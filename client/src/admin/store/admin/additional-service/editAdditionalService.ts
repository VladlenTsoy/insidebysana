import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {AdditionalService} from "admin/lib/types/AdditionalService"

type ReturnedType = AdditionalService

interface AgrProps {
    id: AdditionalService["id"]
    data: {
        title: AdditionalService["title"]
        price: AdditionalService["price"]
        display: AdditionalService["display"]
        url_image: AdditionalService["url_image"]
    }
}

export const editAdditionalService = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/additional-service/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/additional-service/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили доп. услугу!"})
        return response
    }
)
