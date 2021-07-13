import {createApi} from "@reduxjs/toolkit/query/react"
import {Measurement} from "types/measurement"
import baseQuery from "utils/apiConfig"

export const measurementApi = createApi({
    reducerPath: "measurementApi",
    baseQuery,
    endpoints: build => ({
        getMeasurementsApiByProductId: build.query<Measurement, number>({
            query: productId => `measurements/${productId}`
        })
    })
})

export const {useGetMeasurementsApiByProductIdQuery} = measurementApi
