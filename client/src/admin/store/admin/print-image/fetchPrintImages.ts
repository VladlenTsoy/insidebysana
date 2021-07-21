import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {PrintImage} from "./PrintImage"

type ReturnedType = PrintImage[]

export const fetchPrintImages = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/print-images/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/print-images`, {signal})
    },
    {
        condition(_, {getState}) {
            const {printImage} = getState()
            return !printImage.ids.length
        }
    }
)
