import {ProductCardType} from "../product/product"

export interface CartProductItemType {
    product_color_id: number
    size_id: number
    qty: number
    product: ProductCardType
}
