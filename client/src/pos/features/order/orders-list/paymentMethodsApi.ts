import {createApi} from "@reduxjs/toolkit/query/react"
import {PaymentMethod} from "types/payment/PaymentMethod"
import baseQuery from "utils/apiConfig"

export const paymentMethodApi = createApi({
    reducerPath: "paymentMethodApi",
    baseQuery,
    endpoints: build => ({
        getPaymentMethod: build.query<PaymentMethod[], void>({
            query: () => `user/cashier/payment-methods`
        })
    })
})

export const {useGetPaymentMethodQuery} = paymentMethodApi
