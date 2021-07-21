export interface PromoCode {
    id: number
    code: string
    type: "fixed" | "percent"
    discount: number
}