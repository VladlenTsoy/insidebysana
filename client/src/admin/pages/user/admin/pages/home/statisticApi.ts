import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "../../../../../../utils/apiConfig"

interface ResponseType {
    revenue: number
    costs: number
    numberOfChecks: number
    numberOfPositions: number
    numberOfOnlineOrders: number
    numberOfNewClients: number
    averageCheck: number
    revenueByDay: {date: string, total: number}[]
}

export type DateValueType = "today" | "yesterday" | "7d" | "30d" | "3m" | "6m" | "12m" | "custom"

export type StatisticApiProps = {type: DateValueType, dateFrom: any, dateTo: any}

export const statisticApi = createApi({
    reducerPath: "statisticApi",
    baseQuery,
    tagTypes: ["statistic"],
    endpoints: build => ({
        getStatistic: build.mutation<ResponseType, StatisticApiProps>({
            query: body => ({
                url: `user/admin/home/statistic`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistic"]
        })
    })
})

export const {useGetStatisticMutation} = statisticApi
