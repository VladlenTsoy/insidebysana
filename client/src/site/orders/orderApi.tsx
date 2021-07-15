import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

interface Order {
    id: number
    address: {
        full_name: string
        phone: string
        country: string
        city: string
        address: string
    }
    delivery: {
        id: number
        title: string
    }
    discount: number | null
    payments: {
        id: number
        title: string
    }[]
    payment_id: number
    payment_state: number
    productColors: {
        id: number
        title: string
        images: {
            id: number
            url: string
        }[]
        price: number
        product_id: number
        properties: {
            title: string
            description: string
        }[]
        color: {
            id: number
            title: string
        }
        discount: {
            discount: number
            end_at: string
        } | null
        colors: {
            id: number
            product_id: number
            title: string
            hex: string
        }[]
        sizes_props: {
            size_id: number
            title: string
            qty: number
        }[]
    }[]
    total_price: string
    promo_code: {
        id: number
        code: string
        type: "fixed" | "percent"
        discount: number
    }
    created_at: string
}

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    endpoints: build => ({
        getOrders: build.query<Order[], void>({
            query: () => `client/orders`
        })
    })
})

export const {useGetOrdersQuery} = orderApi
