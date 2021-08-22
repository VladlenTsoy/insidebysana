import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintCategory} from "./PrintCategory"

type ReturnedType = PrintCategory[]

type AgrProps = PrintCategory["id"]

export const deletePrintCategory = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-category/delete",
    async categoryId => {
        //
        const response = await apiRequest("delete", `admin/print-category/${categoryId}`)
        response && message({type: "success", content: "Вы успешно удалили категорию для печати!"})
        return response
    }
)
