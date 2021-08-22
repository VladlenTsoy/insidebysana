import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintProduct} from "./PrintProduct"

type ReturnedType = PrintProduct

interface AgrProps {
    id: PrintProduct["id"]
    data: {
        title: PrintProduct["title"]
        url_image: PrintProduct["url_image"]
        product_color_id: PrintProduct["product_color_id"]
        print_image_id: PrintProduct["print_image_id"]
    }
}

export const editPrintProduct = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-product/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/print-product/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили товар для печати!"})
        return response
    }
)
