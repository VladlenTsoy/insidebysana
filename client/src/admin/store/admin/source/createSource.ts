import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {Source} from "../../../lib/types/Source"
import {AdminThunkProps} from "../store"

type ReturnedType = Source

interface AgrProps {
    title: Source["title"]
}

export const createSource = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/source/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/source`, {data})
        response && message({type: "success", content: "Вы успешно создали ресурс!"})
        return response
    }
)
