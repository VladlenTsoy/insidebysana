import {createApi} from "@reduxjs/toolkit/query/react"
import {Banner} from "types/Banner"
import baseQuery from "utils/apiConfig"

export const bannerApi = createApi({
    reducerPath: "bannerApi",
    baseQuery,
    endpoints: build => ({
        getBanners: build.query<Banner[], void>({
            query: () => `banners`
        })
    })
})

export const {useGetBannersQuery} = bannerApi
