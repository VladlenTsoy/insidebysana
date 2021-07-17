import {createApi} from "@reduxjs/toolkit/query/react"
import {City} from "types/city"
import baseQuery from "utils/apiConfig"

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery,
    endpoints: build => ({
        getCitiesByCountryId: build.query<City[], number>({
            query: countryId => `cities/${countryId}`
        })
    })
})

export const {useGetCitiesByCountryIdQuery} = cityApi
