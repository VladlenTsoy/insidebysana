import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {City} from "types/city"

type ReturnedType = City[]

export const fetchCities = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "city/cities/fetch",
    async (data, {signal}) => {
        //
        return await apiRequest("get", `cities`, {type: "guest", signal, data})
    },
    {
        condition(_, {getState}) {
            const {city} = getState()
            return !city.ids.length
        }
    }
)
