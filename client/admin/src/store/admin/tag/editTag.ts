import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "lib/ui"
import {AdminThunkProps} from "../store"
import {Tag} from "../../../lib/types/Tag"

type ReturnedType = Tag

interface AgrProps {
    id: Tag['id']
    data: {
        title: Tag["title"]
    }
}

export const editTag = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/tag/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/tag/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили тег!"})
        return response
    }
)