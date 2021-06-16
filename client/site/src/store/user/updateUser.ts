import {createAsyncThunk} from "@reduxjs/toolkit"
import {User} from "types/user"
import {apiRequest} from "../../utils/api"
import {ThunkProps} from "../store"

type ReturnedType = User

interface AgrsProps {
    full_name: string | null
    email: string | null
    phone: string | null
}

export const updateUser = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "user/update",
    async (data, {signal}) => {
        return await apiRequest("post", `/update`, {signal, data})
    }
)
