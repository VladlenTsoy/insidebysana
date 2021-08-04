import {createApi} from "@reduxjs/toolkit/query/react"
import {OrderTableColumn} from "components/blocks/orders-table-block/OrderTableColumn"
import {Client} from "types/Client"
import {ProductColor} from "types/product/ProductColor"
import {Size} from "types/Size"
import baseQuery from "utils/apiConfig"

// type ReturnedType = OrderPos

interface AgrProps {
    processing?: boolean
    additionalServices: {
        id: number
        title: string
        price: number
        qty: number
    }[]
    payments: {
        payment_id: number
        price: number
    }[]
    discount?: any
    client: Client | null
    products: {
        id: ProductColor["id"]
        size_id: Size["id"]
        qty: number
        price: number
        discount?: ProductColor["discount"]
    }[]
    total_price: number
    clientSourceId: number | null
    clientSourceComment?: string
}

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    tagTypes: ["order"],
    endpoints: build => ({
        getOrders: build.query<OrderTableColumn[], void>({
            query: () => ({
                url: `user/cashier/orders`,
                method: "POST"
            }),
            providesTags: ["order"]
        }),
        createOrder: build.mutation<OrderTableColumn, Partial<AgrProps>>({
            query: body => ({
                url: `user/cashier/pos/order`,
                method: "POST",
                body
            }),
            invalidatesTags: ["order"]
        })
    })
})

export const {useGetOrdersQuery, useCreateOrderMutation} = orderApi
