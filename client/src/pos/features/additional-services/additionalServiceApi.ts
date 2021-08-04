import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {AdditionalService} from "types/AdditionalService"

export const additionalServiceApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery,
    endpoints: build => ({
        getAdditionalServices: build.query<AdditionalService[], void>({
            query: () => `user/cashier/additional-services`
        })
    })
})

export const {useGetAdditionalServicesQuery} = additionalServiceApi
