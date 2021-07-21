import {createApi} from "@reduxjs/toolkit/query/react"
import {Newsletter} from "types/Newsletter"
import baseQuery from "utils/apiConfig"

export const newsletterApi = createApi({
    reducerPath: "newsletterApi",
    baseQuery,
    endpoints: build => ({
        subscribeNewsletter: build.mutation<Newsletter[], Partial<string>>({
            query: email => ({
                url: `newsletter/subscribe`,
                method: "POST",
                body: {email}
            })
        })
    })
})

export const {useSubscribeNewsletterMutation} = newsletterApi
