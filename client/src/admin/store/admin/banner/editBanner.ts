import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Banner} from "../../../lib/types/Banner";

type ReturnedType = Banner

interface AgrProps {
    id: Banner["id"]
    data: {
        title: Banner["title"]
        url_image: Banner["url_image"]
        button_title: Banner["button_title"]
        button_link: Banner["button_link"]
    }
}

export const editBanner = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/banner/edit",
    async ({ id, data }) => {
        //
        const response = await apiRequest("patch", `admin/banner/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили баннер!"})
        return response
    }
)
