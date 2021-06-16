import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintImage} from "./PrintImage"

type ReturnedType = PrintImage

interface AgrProps {
    id: PrintImage["id"]
    data: {
        title: PrintImage["title"]
    }
}

export const editPrintImage = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-image/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/print-image/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили картинку для печати!"})
        return response
    }
)
