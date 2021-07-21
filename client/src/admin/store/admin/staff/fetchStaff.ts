import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {AdminThunkProps} from "../store"
import {User} from "../../../lib/types/User"

type ReturnedType = {
    total: number
    results: User[]
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

export const fetchStaff = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/staff/fetch",
    async (data, {signal}) => {
        return await apiRequest("post", `admin/users`, {signal, data})
    },
)