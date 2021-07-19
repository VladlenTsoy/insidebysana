import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {PrintCategory} from "./PrintCategory"

type ReturnedType = PrintCategory[]

export const fetchPrintCategories = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/print-categories/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `print-categories`, {signal, type: "guest"})
    },
    {
        condition(_, {getState}) {
            const {printCategory} = getState()
            return !printCategory.ids.length
        }
    }
)
