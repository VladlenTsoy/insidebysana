import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Order, OrderAddress, OrderDiscount, OrderPayment} from "../../../lib/types/Order"
import {Client} from "../../../lib/types/Client"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {Size} from "../../../lib/types/Size"
import {Delivery} from "admin/lib/types/Delivery"

type ReturnedType = Order

interface AgrProps {
    id: Order["id"]
    data: {
        processing?: boolean
        client: Client | null
        address: OrderAddress | null
        delivery_id: Delivery["id"] | null
        discount: OrderDiscount | null
        products: {
            id: ProductColor["id"]
            size_id: Size["id"]
            qty: number
            price: number
            discount: number
        }[]
        created_at: string
        payments: OrderPayment[]
        total_price: number
        additionalServices: any[]
    }
}

export const editOrder = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/order/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/order/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили сделку!"})
        return response
    }
)
