export interface ProductCardType {
    id: number
    title: string
    price: number
    discount?: {
        discount: number
        end_at: string
    }
    color: {
        id: number
        hex: string
        title: string
    }
    sizes_props: {
        title: string
        qty: number
        size_id: number
    }[]
    url_thumbnail: string
}
