import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {message} from "../../../lib/ui"
import {AdditionalService} from "admin/lib/types/AdditionalService"

type ReturnedType = AdditionalService["id"]

type AgrProps = AdditionalService["id"]

export const deleteAdditionalService = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/additional-service/delete",
    async id => {
        //
        const response = await apiRequest("delete", `admin/additional-service/${id}`)
        response && message({type: "success", content: "Вы успешно удалили доп. услугу!"})
        return id
    }
)
