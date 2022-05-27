import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "admin/utils/api"
import {AdminThunkProps} from "../../../store"
import {ProductStorage} from "../../../../types/product/ProductStorage"

type ReturnedType = ProductStorage[]

export const fetchProductStorage = createAsyncThunk<ReturnedType, undefined, AdminThunkProps>(
    "admin/product-storage/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/product-storages`, {signal})
    },
    {
        condition(_, {getState}) {
            const {productStorage} = getState()
            return !productStorage.ids.length
        }
    }
)
