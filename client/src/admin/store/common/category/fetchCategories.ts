import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Category} from "../../../lib/types/Category"

type ReturnedType = Category[]

export const fetchCategories = createAsyncThunk<ReturnedType, undefined, CommonThunkProps>(
    "categories/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `categories`, {signal})
    },
    {
        condition(_, {getState}) {
            const {category} = getState()
            return !category.ids.length
        }
    }
)
