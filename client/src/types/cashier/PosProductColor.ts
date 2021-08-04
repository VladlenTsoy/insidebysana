export interface ProductColorCard {
    id: number
    url_thumbnail: string
    details: {
        title: string
        price: number
    }
    discount?: {
        id: number
        discount: number
    }
    color: {
        id: number
        title: string
        hex: string
    }
    sizes: {
        qty: number
        min_qty: number
        cost_price: number
    }[]
}

export interface ProductColorCart {
    product_color_id: number
    size_id: number
    qty: number
    product: {
        details: {
            title: string
            price: number
        }
        color: {
            id: number
            title: string
        }
        discount?: {
            id: number
            discount: number
        }
        url_thumbnail: string
        sizes: {
            qty: number
            min_qty: number
            cost_price: number
        }[]
    }
}
