import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "../../../store"
import {apiRequest} from "../../../utils/api"
import {PrintProduct} from "./PrintProduct"

type ReturnedType = PrintProduct[]

interface AgrProps {
    imageId: number
}

export const fetchPrintProductsByImageId = createAsyncThunk<ReturnedType, AgrProps, AdminThunkProps>(
    "admin/print-products/fetch",
    async ({imageId}, {signal}) => {
        return await apiRequest("get", `admin/print-products/${imageId}`, {signal})
    },
    // {
    //     condition(_, {getState}) {
    //         const {printProduct} = getState()
    //         return !printProduct.ids.length
    //     }
    // }
)
