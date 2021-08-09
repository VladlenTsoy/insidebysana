export interface ProductColorCart {
    sku: string
    id: number
    size_id: number
    qty: number
    title: string
    url_thumbnail: string
    color: {
        id: number
        title: string
    }
    discount?: {
        discount: number
        end_at: string
    } | null
    price: number
    size: {
        id: number
        qty: number
        title: string
    }
    promotion?: number
    total_price: number
}
