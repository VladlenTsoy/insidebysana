import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {LookbookCategory} from "../../../lib/types/Lookbook"

type ReturnedType = LookbookCategory[]

export const fetchLookbookCategories = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/lookbook-category/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/lookbook-categories`, {signal})
    },
    {
        // condition(_, {getState}) {
        //     const {lookbook} = getState()
        //     return !lookbook.ids.length
        // }
    }
)
