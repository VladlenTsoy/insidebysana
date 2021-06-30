import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintProduct} from "./PrintProduct"

type ReturnedType = PrintProduct["id"]

type AgrProps = PrintProduct["id"]

export const deletePrintProduct = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-product/delete",
    async printProductId => {
        //
        const response = await apiRequest("delete", `admin/print-product/${printProductId}`)
        response && message({type: "success", content: "Вы успешно удалили товар для печати!"})
        return response
    }
)
