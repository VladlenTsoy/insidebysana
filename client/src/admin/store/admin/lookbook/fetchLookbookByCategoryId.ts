import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Lookbook} from "../../../lib/types/Lookbook"

type ReturnedType = Lookbook[]

export const fetchLookbookByCategoryId = createAsyncThunk<ReturnedType, number, AdminThunkProps>(
    "admin/lookbook/fetch",
    async (categoryId, {signal}) => {
        return await apiRequest("get", `admin/category/${categoryId}/lookbook`, {signal})
    }
    // {
    //     condition(_, {getState}) {
    //         const {lookbook} = getState()
    //         return !lookbook.ids.length
    //     }
    // }
)
