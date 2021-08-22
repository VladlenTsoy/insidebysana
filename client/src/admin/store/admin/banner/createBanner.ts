import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Banner} from "../../../lib/types/Banner";

type ReturnedType = Banner

interface AgrProps {
    title: Banner["title"]
    image: Banner["url_image"]
    button_title: Banner["button_title"]
    button_link: Banner["button_link"]
}

export const createBanner = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/banner/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/banner`, {data})
        response && message({type: "success", content: "Вы успешно создали баннер!"})
        return response
    }
)
