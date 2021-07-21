import {createApi} from "@reduxjs/toolkit/query/react"
import {AdditionalService} from "types/AdditionalService"
import baseQuery from "utils/apiConfig"

export const additionalServiceApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery,
    endpoints: build => ({
        getAdditionalServiceApis: build.query<AdditionalService[], void>({
            query: () => `additional-services`
        })
    })
})

export const {useGetAdditionalServiceApisQuery} = additionalServiceApi
