import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Country} from "types/country"

type ReturnedType = Country[]

export const fetchCountries = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "country/countries/fetch",
    async (data, {signal}) => {
        //
        return await apiRequest("get", `countries`, {type: "guest", signal, data})
    },
    {
        condition(_, {getState}) {
            const {country} = getState()
            return !country.ids.length
        }
    }
)
