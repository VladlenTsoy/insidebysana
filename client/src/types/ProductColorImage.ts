import {ProductColor} from "./product/ProductColor"

export interface ProductColorImage {
    id: number
    image: string
    thumbnail: '0' | '1'
    product_color_id: ProductColor['id']
}