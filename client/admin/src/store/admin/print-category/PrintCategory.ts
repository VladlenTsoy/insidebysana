export interface PrintCategory {
    id: number
    title: string
    hide_id?: number
    sub_categories: PrintSubCategory[]
}

export interface PrintSubCategory {
    id: number
    title: string
    category_id: number
    hide_id?: number
}
