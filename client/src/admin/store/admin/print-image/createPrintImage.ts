import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintImage} from "./PrintImage"

type ReturnedType = PrintImage

interface AgrProps {
    title: PrintImage["title"]
    price: PrintImage["price"]
    category_id: PrintImage["category"]["id"]
    url_image: PrintImage["url_image"]
}

export const createPrintImage = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-image/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/print-image`, {data})
        response && message({type: "success", content: "Вы успешно добавили картинку для печати!"})
        return response
    }
)
