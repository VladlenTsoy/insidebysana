export interface Measurement {
    product_id: number
    titles: string[]
    sizes: {
        name: string
        descriptions: string[]
    }[]
}