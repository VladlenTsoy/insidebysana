export interface ProductColor {
    id: number
    title: string
    images: {
        id: number
        url: string
    }[]
    price: number
    product_id: number
    properties: {
        title: string
        description: string
    }[]
    color: {
        id: number
        title: string
    }
    discount: {
        discount: number
        end_at: string
    } | null
    colors: {
        id: number
        product_id: number
        title: string
        hex: string
    }[]
    sizes: {
        size_id: number
        title: string
        qty: number
    }[]
}

export interface ProductColorCard {
    id: number
    url_thumbnail: string
    title: string
    price: number
    color: {
        id: number
        title: string
    }
    discount: {
        discount: number
        end_at: string
    } | null
    is_new?: boolean
}
