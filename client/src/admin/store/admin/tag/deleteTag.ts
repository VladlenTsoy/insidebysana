import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {message} from "admin/lib/ui"
import {AdminThunkProps} from "../store"
import {Tag} from "../../../lib/types/Tag"

type ReturnedType = Tag["id"]

type AgrProps = Tag["id"]

export const deleteTag = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/tag/delete",
    async (id) => {
        //
        const response = await apiRequest("delete", `admin/tag/${id}`)
        response && message({type: "success", content: "Вы успешно удалили тег!"})
        return id
    }
)