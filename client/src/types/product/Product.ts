import {Category} from "../Category"
import {Tag} from "../Tag"

export interface Product {
    id: number | string
    basic: {
        id: number
        title: string
        image: string
        url_image: string
        price: number
        category_id: Category['id']
        tags_id: Tag['id']
        created_at: string
        updated_at: string
    }
    colors: {
        id: number
        images: string[]
        props: {
            [key: number]: {
                qty: number
                min_qty: number
                cost_price: number
            }
        }
    }[]
    measurements: {
        id: number
        title: string
        descriptions: {
            [key: number]: string
        }
        product_id: string
        created_at: string
        updated_at: string
    }
    properties: {
        title: string
        description: string
    }[]
}
