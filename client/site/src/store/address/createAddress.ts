import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Address} from "../../types/address"

type ReturnedType = Address

interface AgrsProps {
    title: Address["title"]
    address: Address["address"]
    full_name: Address["full_name"]
    phone: Address["phone"]
    country: Address["country"]
    city: Address["city"]
}

export const createAddress = createAsyncThunk<ReturnedType, AgrsProps, ThunkProps>(
    "address/create",
    async (data, {signal}) => {
        //
        return await apiRequest("post", `address`, {signal, data})
    }
)
