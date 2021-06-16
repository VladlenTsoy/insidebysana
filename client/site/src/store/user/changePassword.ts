import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "../../utils/api"
import {ThunkProps} from "../store"

type ReturnedType = {
    status: "success"
}

interface AgrsProps {
    password: string
}

export const changePassword = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "user/change-password",
    async (data, {signal}) => {
        return await apiRequest("post", `/change-password`, {signal, data})
    }
)
