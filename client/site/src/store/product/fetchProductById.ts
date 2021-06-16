import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {apiRequest} from "../../utils/api"
import {ProductColor} from "../../types/productColor"

type ReturnedType = ProductColor

type ArgsProps = string

// Вывод продукта по Id
export const fetchProductById = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "product/fetch/id",
    async (id, {signal}) => {
        return await apiRequest("get", `product-color/${id}`, {type: "guest", signal})
    }, {
        condition(id, {getState}) {
            const {product} = getState()
            return !product.ids.includes(Number(id))
        }
    }
)