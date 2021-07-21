import {createAsyncThunk} from "@reduxjs/toolkit"
import {CashierThunkProps} from "../store"
import {Client} from "../../../lib/types/Client"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {Size} from "../../../lib/types/Size"
import {apiRequest} from "admin/utils/api"
import {message} from "../../../lib/ui"
import {OrderPos} from "admin/lib/types/Order"

type ReturnedType = OrderPos

interface AgrProps {
    processing?: boolean
    additionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    payments: {
        payment_id: number
        price: number
    }[]
    discount?: any
    client: Client | null
    products: {
        id: ProductColor["id"]
        size_id: Size["id"]
        qty: number
        price: number
        discount?: ProductColor["discount"]
    }[]
    total_price: number
}

export const createPosOrder = createAsyncThunk<ReturnedType, AgrProps, CashierThunkProps>(
    "cashier/pos/order/create",
    async data => {
        const response = await apiRequest("post", `cashier/pos/order`, {data})
        response && message({type: "success", content: "Вы успешно создали сделку!"})
        return response
    }
)
