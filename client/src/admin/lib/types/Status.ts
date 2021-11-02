export interface Status {
    id: number
    title: string
    sms: {
        "message": string
        "timeout": number
        "payment_state": string[]
    }[]
    email: null
    access: "manage" | "admin"
    fixed: 0 | 1
    position: number
    // orders: object[]
    conditions: {
        payments: number[]
        payments_state: number[]
    }
    loading?: boolean
}