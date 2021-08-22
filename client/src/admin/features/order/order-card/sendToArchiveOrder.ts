import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Order} from "../../../lib/types/Order"

type ReturnedType = Order["id"]

type AgrProps = Order["id"]

export const sendToArchiveOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/send-to-archive",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/archive`)
        response && message({type: "success", content: "Вы успешно отравили заказ в архив!"})
        return id
    }
)
