import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {AdditionalService} from "../../types/additionalService"

type ReturnedType = AdditionalService[]

export const fetchAdditionalServices = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "additional-service/fetch/additional-services",
    async (_, {signal}) => {
        return await apiRequest("get", `additional-services`, {type: "guest", signal})
    },
    {
        condition(_, {getState}) {
            const {additionalService} = getState()
            return !additionalService.ids.length
        }
    }
)
