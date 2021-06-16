import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintImage} from "./PrintImage"

type ReturnedType = PrintImage[]

type AgrProps = PrintImage["id"]

export const deletePrintImage = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-image/delete",
    async printImageId => {
        //
        const response = await apiRequest("delete", `admin/print-image/${printImageId}`)
        response && message({type: "success", content: "Вы успешно удалили картинку для печати!"})
        return response
    }
)
