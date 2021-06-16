import {ProductColor} from "./ProductColor"

export interface ProductColorPrint {
    id: number
    uid: string
    image?: string
    name: string
    size: number
    type: string
    status: 'error' | 'success' | 'done' | 'uploading' | 'removed'
    url: string
    product_color_id: ProductColor["id"]
}
