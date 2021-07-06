import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export default fetchBaseQuery({baseUrl: "production" ? "https://api.insidebysana.uz/api" : "http://localhost:8000/api"})
