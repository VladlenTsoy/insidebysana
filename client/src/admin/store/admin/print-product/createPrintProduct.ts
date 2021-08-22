import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {PrintProduct} from "./PrintProduct"

type ReturnedType = PrintProduct

interface AgrProps {
    title: PrintProduct["title"]
    url_image: PrintProduct["url_image"]
    product_color_id: PrintProduct["product_color_id"]
    print_image_id: PrintProduct["print_image_id"]
}

export const createPrintProduct = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-product/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/print-product`, {data})
        response && message({type: "success", content: "Вы успешно добавили товар для печати!"})
        return response
    }
)
