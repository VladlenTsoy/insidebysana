import {createAsyncThunk} from "@reduxjs/toolkit"
import {CashierThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {ProductColorCart} from "admin/lib/types/cashier/PosProductColor"
import {message} from "antd"

type ReturnedType = ProductColorCart | undefined

type AgrsProps = {
    sku: string
}

export const fetchProductColorBySKU = createAsyncThunk<ReturnedType, AgrsProps, CashierThunkProps>(
    "pos/product-color/sku",
    async ({sku}, {signal}) => {
        if (sku.trim() !== "") {
            message.loading({content: `${sku.toUpperCase()} Поиск...`, key: sku})
            const response = await apiRequest("post", `cashier/product-color/sku`, {data: {sku}, signal})
            message.success({content: "Товар добавлен!", key: sku, duration: 2})
            return response
        }
    },
    {
        condition: ({sku}) => {
            return !!(sku && sku.trim() !== "" && /(PC\d+S\d+)+/g.test(sku))
        }
    }
)
