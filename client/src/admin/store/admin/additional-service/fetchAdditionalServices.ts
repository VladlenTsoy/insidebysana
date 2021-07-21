import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {AdditionalService} from "admin/lib/types/AdditionalService"

type ReturnedType = AdditionalService[]

export const fetchAdditionalServices = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/additional-service/all/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/additional-services`, {signal})
    },
    {
        condition(_, {getState}) {
            const {additionalService} = getState()
            return !additionalService.ids.length
        }
    }
)
