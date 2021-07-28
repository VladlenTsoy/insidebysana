export interface Order {
    id: number
    source_id: number
    total_price: number
    discount: {type: "percent" | "fixed"; discount: number}
    promo_code: {
        id: number
        code: string
        type: "percent" | "fixed"
        discount: number
        status: "active" | "inactive"
        client_id: number
        end_at: string
    }
    user: {
        id: number
        full_name: string
    }
    status_id: number
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
    productColors: {
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
    }[]
    additionalServices: {
        id: number
        title: string
        qty: number
        price: number
    }[]
}
