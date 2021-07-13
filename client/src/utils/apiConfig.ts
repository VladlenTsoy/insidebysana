import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export default fetchBaseQuery({
    baseUrl:
        process.env.NODE_ENV === "production"
            ? "https://api.insidebysana.uz/api"
            : "http://localhost:8000/api",
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        try {
            const token = (getState() as any).auth.token
            if (token) headers.set("Authorization", `Bearer ${token}`)
        } catch (e) {
            // console.error(e)
        }
        return headers
    }
})
