import {ProductColor} from "./product/ProductColor"
import {PromoCode} from "./PromoCode"
import {Source} from "./Source"
import {Status} from "./Status"

export interface Order {
    id: number
    source_id: Source["id"]
    total_price: number
    discount: OrderDiscount
    promo_code: PromoCode
    user: {
        id: number
        full_name: string
    }
    status_id: Status["id"]
    position: number
    payment_state: number
    payments: {
        payment_id: number
        title: string
        price: number
    }[]
    loading?: boolean
    next_status_id?: Status["id"]
    client: {
        id: number
        full_name: string
        phone: string
    }
    processing: 0 | 1
    productColors: OrderProductColor[]
    additionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    created_at: string
}

export interface ArchiveOrder extends OrderPos {}

export interface OrderAddress {
    id: number
    full_name: string
    phone: string
    country: string
    city: string
    address: string
}

export interface OrderProductColor {
    id: number
    discount: number
    price: number
    product_color_id: number
    details: {
        id: number
        title: string
        url_thumbnail: string
    }
    size: {
        id: number
        title: string
    }
    qty: number
}

export interface OrderDiscount {
    type: "percent" | "fixed"
    discount: number
}

export interface OrderPos {
    id: number
    source_id: Source["id"]
    total_price: number
    discount: OrderDiscount
    promo_code: PromoCode
    user: {
        id: number
        full_name: string
    }
    status_id: Status["id"]
    position: number
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
    }
    processing: 0 | 1
    created_at: string
    productColors: OrderProductColor[]
    additionalServices: {
        id: number
        title: string
        qty: number
        price: number
    }[]
}

export interface OrderProductColor {
    id: number
    discount: number
    price: number
    product_color_id: number
    title: string
    url_thumbnail: string
    size_id: number
    size_title: string
    color_title: string
    qty: number
}

export interface OrderPayment {
    payment_id: number
    price: number
    label: string
}

export type OrderProduct = {
    qty: number
    product_color_id: number
    size_id: number
    price: number
    product: ProductColor
}
