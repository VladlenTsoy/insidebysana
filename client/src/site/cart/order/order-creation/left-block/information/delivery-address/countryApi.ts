import {createApi} from "@reduxjs/toolkit/query/react"
import {Country} from "types/Country"
import baseQuery from "utils/apiConfig"

export const countryApi = createApi({
    reducerPath: "countryApi",
    baseQuery,
    endpoints: build => ({
        getCountries: build.query<Country[], void>({
            query: () => `countries`
        })
    })
})

export const {useGetCountriesQuery} = countryApi
