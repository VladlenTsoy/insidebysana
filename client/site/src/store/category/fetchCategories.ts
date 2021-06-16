import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Category} from "../../types/category"

type ReturnedType = Category[]

export const fetchCategories = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "category/fetch",
    async (data, {signal}) => {
        //
        return await apiRequest("get", `categories`, {type: "guest", signal, data})
    },
    {
        condition(_, {getState}) {
            const {category} = getState()
            return !category.ids.length
        }
    }
)