import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Address} from "../../types/address"

type ReturnedType = Address[]

export const fetchAddress = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "addresses/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `addresses`, {signal})
    },
    {
        condition(_, {getState}) {
            const {address} = getState()
            return !address.ids.length
        }
    }
)
