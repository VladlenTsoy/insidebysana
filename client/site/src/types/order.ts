import {ProductColorCard} from "./productColor"
import {PromoCode} from "./promoCode"

export interface Order {
    id: number
    address: {
        full_name: string
        phone: string
        country: string
        city: string
        address: string
    }
    delivery: {
        id: number
        title: string
    }
    discount: number | null
    payment: {
        id: number
        title: string
    }
    payment_id: number
    payment_state: number
    productColors: ProductColorCard[]
    total_price: string
    promo_code: PromoCode
    created_at: string
}
