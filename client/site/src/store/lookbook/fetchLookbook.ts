import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Lookbook} from "../../types/lookbook"

type ReturnedType = Lookbook[]

export const fetchLookbook = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "lookbook/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `lookbook`, {type: "guest", signal})
    },
    {
        condition(_, {getState}) {
            const {lookbook} = getState()
            return !lookbook.ids.length
        }
    }
)