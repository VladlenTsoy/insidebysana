import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../store"
import {apiRequest} from "../../../utils/api"
import {Client} from "admin/lib/types/Client"

type ReturnedType = Client

type ArgsProps = string | number

export const fetchClientById = createAsyncThunk<ReturnedType, ArgsProps, AdminThunkProps>(
    "admin/client/fetch/id",
    async (id, {signal}) => {
        //
        return await apiRequest("get", `admin/client/${id}`, {signal})
    },
    {
        condition(id, {getState}) {
            const {client} = getState()
            return !client.ids.includes(id)
        }
    }
)
