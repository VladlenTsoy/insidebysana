import {createApi} from "@reduxjs/toolkit/query/react"
import {Delivery} from "types/Delivery"
import baseQuery from "utils/apiConfig"

export const deliveryApi = createApi({
    reducerPath: "deliveryApi",
    baseQuery,
    endpoints: build => ({
        getDeliveries: build.query<Delivery[], string>({
            query: country => ({
                url: `delivery`,
                method: "POST",
                body: {country}
            })
        })
    })
})

export const {useGetDeliveriesQuery} = deliveryApi
