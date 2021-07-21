import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {AdditionalService} from "admin/lib/types/AdditionalService"

type ReturnedType = AdditionalService

interface AgrProps {
    title: AdditionalService["title"]
    price: AdditionalService["price"]
    display: AdditionalService["display"]
    url_image: AdditionalService["url_image"]
}

export const createAdditionalService = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/additional-service/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/additional-service`, {data})
        response && message({type: "success", content: "Вы успешно создали доп. услугу!"})
        return response
    }
)
