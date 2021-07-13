import {createApi} from "@reduxjs/toolkit/query/react"
import {Delivery} from "types/Delivery"
import baseQuery from "utils/apiConfig"

export const deliveryApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery,
    endpoints: build => ({
        getDeliveries: build.query<Delivery[], string>({
            query: body => ({
                url: `delivery`,
                method: "POST",
                body
            })
        })
    })
})

export const {useGetDeliveriesQuery} = deliveryApi
