import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {Size} from "admin/lib/types/Size"

type ReturnedType = Size

interface AgrProps {
    title: Size["title"]
}

export const createSize = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/size/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/size`, {data})
        response && message({type: "success", content: "Вы успешно создали размер!"})
        return response
    }
)
