import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Client} from "../../../lib/types/Client"

type ReturnedType = {
    total: number
    results: Client[]
}

interface ArgsProps {
    search: string
    pagination: {
        current: number
        pageSize: number
    }
    sorter: {
        field: string | string[]
        order: string
    }
}

export const fetchClients = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/clients/fetch",
    async (data, {signal}) => {
        return await apiRequest("post", `admin/clients/table`, {signal, data})
    }
)
