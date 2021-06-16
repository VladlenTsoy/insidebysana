export interface Category {
    id: number
    title: string
    url: string
}

export interface SubCategory {
    id: number
    title: string
    url: string
    category_id: number
}