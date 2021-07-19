import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Size} from "../../../lib/types/Size"

type ReturnedType = Size[]

export const fetchSizes = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    "sizes/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `sizes`, {signal})
    },
    {
        condition(_, {getState}) {
            const {size} = getState()
            return !size.ids.length
        }
    }
)
