export interface Newsletter {
    id: number
    email: string
    status: "active" | "inactive"
    created_at: string
}