export interface Status {
    id: number
    title: string
    sms: any
    email: any
    access: "manage" | "admin"
    fixed: 0 | 1
    position: number,
    orders: object[]
    conditions: {
        payments: number[]
        payments_state: number[]
    }
    loading?: boolean
}