export interface Category {
  id: number
  title: string
  url: string
  hide_id?: number | null
  sub_categories?: SubCategory[]
}

export interface SubCategory {
  id: number
  title: string
  url: string
  category_id: number
  hide_id?: number
}