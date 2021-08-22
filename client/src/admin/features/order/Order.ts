export interface OrderCardType {
    id: number
    client: {
        id: number
        full_name: string
        phone: string | null
    } | null
    discount: {
        type: "percent" | "fixed"
        discount: number
    } | null
    payment_state: number
    position: number
    promo_code: {
        id: number
        code: string
        type: "percent" | "fixed"
        discount: number
    } | null
    status_id: number
    total_price: string | number
    created_at: string
    delivery: {
        id: number
        price: number
        title: string
    }
    product_color_qty: number
    //
    // loading?: boolean
    // next_status_id?: number
}
