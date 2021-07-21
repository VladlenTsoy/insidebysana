export interface LookbookCategory {
    id: number
    title: string
    url_image: string
}
export interface Lookbook {
    id: number
    url_image: string
    position: number
    category_id: number
    created_at: string
}
