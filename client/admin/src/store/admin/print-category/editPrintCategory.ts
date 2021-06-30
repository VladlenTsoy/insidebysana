import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintCategory} from "./PrintCategory"

type ReturnedType = PrintCategory[]

interface AgrProps {
    id: PrintCategory["id"]
    data: {
        title: PrintCategory["title"]
        cateogry_id?: PrintCategory["id"]
    }
}

export const editPrintCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-category/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/print-category/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили категорию для печати!"})
        return response
    }
)
