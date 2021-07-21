import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintCategory} from "./PrintCategory"

type ReturnedType = PrintCategory

interface AgrProps {
    title: PrintCategory["title"]
    category_id?: PrintCategory["id"]
}

export const createPrintCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-category/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/print-category`, {data})
        response && message({type: "success", content: "Вы успешно создали категорию для печати!"})
        return response
    }
)
