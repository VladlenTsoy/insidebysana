export interface OrderTableColumn {
    id: number
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
    total_price: number
    discount: {
        type: "percent" | "fixed"
        discount: number
    }
    promo_code: {
        id: number
        code: string
        type: "percent" | "fixed"
        discount: number
        status: "active" | "inactive"
        client_id: number
        end_at: string
    }
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
    source_id?: number
    user?: {
        id: number
        full_name: string
    }
}
