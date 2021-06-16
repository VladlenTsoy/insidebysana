import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Address} from "../../types/address"

type ReturnedType = Address["id"]

type AgrsProps = Address["id"]

export const deleteAddress = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "address/delete",
    async (id, {signal}) => {
        //
        await apiRequest("delete", `address/${id}`, {signal})
        return id
    }
)
