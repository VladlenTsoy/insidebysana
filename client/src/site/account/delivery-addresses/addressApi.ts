import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"

export interface Address {
    id: number
    title: string
    full_name: string
    phone: string
    country: "uz" | "ru" | "kz"
    city: string
    address: string
}

export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery,
    tagTypes: ["addresses"],
    endpoints: build => ({
        getAddresses: build.query<Address[], void>({
            query: () => `client/addresses`,
            providesTags: ["addresses"]
        }),
        createAddress: build.mutation<Address, Partial<Address>>({
            query(body) {
                return {
                    url: `client/address`,
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["addresses"]
        }),
        deleteAddress: build.mutation<{success: boolean; id: number}, number>({
            query(id) {
                return {
                    url: `client/address/${id}`,
                    method: "DELETE"
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: ["addresses"]
        })
    })
})

export const {useGetAddressesQuery, useDeleteAddressMutation, useCreateAddressMutation} = addressApi
