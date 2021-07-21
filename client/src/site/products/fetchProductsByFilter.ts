import {apiRequest} from "../../utils/api"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "../store"
import {Size} from "../../types/Size"
import {Category} from "../../types/Category"
import {ProductColorCard} from "../../types/productColor"
import {Color} from "../../types/Color"

type ReturnedType = {
    products: ProductColorCard[]
    sizes: Size[]
    colors: Color[]
    categories: Category[]
    price: {
        min: number
        max: number
    }
}

type ArgsProps = {
    price: {
        min: number
        max: number
    }
    sort: {column: string; dir: string}
    colorIds: any[]
    categoryId?: any
    sizeIds?: any[]
    subCategoryIds?: any[]
}

export const fetchProductsByFilter = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "product-cards/fetch",
    async (data, {signal}) => {
        //
        return await apiRequest("post", `product-colors`, {type: "guest", signal, data})
    }
)
