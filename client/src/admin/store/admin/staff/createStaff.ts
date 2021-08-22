import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminThunkProps } from "../../../store";
import { apiRequest } from "../../../utils/api";
import { message } from "../../../lib/ui";
import { User } from "../../../lib/types/User";

type ReturnedType = User

interface AgrProps {
    access: string
    full_name: string
    email?: string
    password?: string
}

export const createStaff = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/staff/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/user`, {data})
        response && message({type: "success", content: "Вы успешно создали пользователя!"})
        return response
    }
)