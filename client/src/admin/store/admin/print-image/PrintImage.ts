export interface PrintImage {
    id: number
    title: string
    price: number
    url_image: string
    url_thumbnail: string
    category: {
        id: number
        title: string
    }
}
