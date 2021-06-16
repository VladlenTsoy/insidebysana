import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../common/store"
import {apiRequest} from "../../../utils/api"
import {AdditionalService} from "lib/types/AdditionalService"

type ReturnedType = AdditionalService[]

export const fetchAdditionalServicesCashier = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    "admin/additional-service/all/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `cashier/additional-services`, {signal})
    },
    {
        condition(_, {getState}) {
            const {additionalService} = getState()
            return !additionalService.ids.length
        }
    }
)
