// import {Client} from "./Client"
// import {PaymentMethod} from "./payment/PaymentMethod"
// import {Product} from "./product/Product"
import {ProductColor} from "./product/ProductColor"
import {PromoCode} from "./PromoCode"
import {Source} from "./Source"
import {Status} from "./Status"
// import {User} from "./User"

export interface Order {
    id: number
    // products_id: Product["id"][]
    // client_id: Client["id"]
    // payment_id: PaymentMethod["id"]
    // user_id: User["id"]
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
        id: number
        title: string
    }[]
    loading?: boolean
    next_status_id?: Status["id"]

    client: {
        id: number
        full_name: string
        phone: string
    }
    created_at: string
}

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
        price: string
    }[]
    client: {
        id: number
        full_name: string
        phone: string
    }
    processing: boolean
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
}

export type OrderProduct = {
    qty: number
    product_color_id: number
    size_id: number
    price: number
    product: ProductColor
}
