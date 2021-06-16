import {Category} from "../Category"
import {Tag} from "../Tag"

export interface ProductColor {
    id: number | string
    category: {
        id: Category["id"]
        title: Category["title"]
    }
    title: string
    image: string
    properties: {
        title: string
        description: string
    }[]
    color: {
        id: number
        title: string
    }
    discount: {
        id?: number
        product_color_id?: number
        discount: number
        end_at?: string
    }
    price: number
    tags_id: Tag["id"][]
    //
    url_images: string[]
    details: {
        id: number
        title: string
        url_image: string
        price: number
    }
    sizes: {
        [id: number]: {
            qty: number
            min_qty: number
            cost_price: number
        }
    }
    url_thumbnail: string
}
