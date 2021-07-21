export interface PrintProduct {
    id: number
    title: string
    product_color_id: number
    print_image_id: number
    url_image: string
    url_thumbnail: string
    product_color: {
        id: number
        title: string
        color_title: string
    }
}
