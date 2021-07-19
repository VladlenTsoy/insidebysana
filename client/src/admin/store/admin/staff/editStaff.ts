import {User} from "../../../lib/types/User"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"

type ReturnedType = User

interface AgrProps {
    id: User["id"]
    data: {
        access: string
        full_name: string
        email: string
        password?: string
    }
}

export const editStaff = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/staff/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("post", `admin/user/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили пользователя!"})
        return response
    }
)
