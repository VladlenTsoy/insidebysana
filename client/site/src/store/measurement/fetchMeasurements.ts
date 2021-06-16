import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Measurement} from "../../types/measurement"

type ReturnedType = Measurement

type ArgsProps = number

export const fetchMeasurements = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "measurements/fetch",
    async (productId, {signal}) => {
        //
        return await apiRequest("get", `measurements/${productId}`, {type: "guest", signal})
    },
    {
        condition(productId, {getState}) {
            const {measurement} = getState()
            return !measurement.ids.includes(String(productId))
        }
    }
)