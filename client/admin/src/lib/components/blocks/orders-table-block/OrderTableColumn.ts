import {OrderDiscount, OrderProductColor} from "lib/types/Order"
import {PromoCode} from "lib/types/PromoCode"
import {Source} from "lib/types/Source"

export interface OrderTableColumn {
    id: number
    productColors: OrderProductColor[]
    total_price: number
    discount: OrderDiscount
    promo_code: PromoCode
    payment_state: number
    payments: {
        payment_id: number
        title: string
        price: number
    }[]
    client: {
        id: number
        full_name: string
        phone: string
    } | null
    processing: 0 | 1
    additionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    created_at: string

    // Админ
    source_id?: Source["id"]
    user?: {
        id: number
        full_name: string
    }
}
