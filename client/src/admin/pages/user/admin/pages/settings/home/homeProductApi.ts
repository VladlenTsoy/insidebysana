import {createAsyncThunk} from "@reduxjs/toolkit"
import {AdminThunkProps} from "admin/store/admin/store"
import {apiRequest} from "admin/utils/api"
import {HomeProduct} from "./homeProductSlice"
import {message} from "admin/lib/ui"

export const fetchHomeProducts = createAsyncThunk<HomeProduct[], undefined, AdminThunkProps>(
    "admin/home-products/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/home-products`, {signal})
    },
    {
        condition(_, {getState}) {
            const {homeProduct} = getState()
            return !homeProduct.ids.length
        }
    }
)

export const createHomeProduct = createAsyncThunk<
    HomeProduct,
    {
        product_color_id: HomeProduct["product_color_id"]
        position: HomeProduct["position"]
    },
    AdminThunkProps
>("admin/home-product/create", async data => {
    //
    const response = await apiRequest("post", `admin/home-product`, {data})
    response && message({type: "success", content: "Вы успешно добавили продукт на главную страницу!"})
    return response
})

export const editHomeProduct = createAsyncThunk<
    HomeProduct,
    {
        id: HomeProduct["id"]
        data: {
            product_color_id: HomeProduct["product_color_id"]
            position: HomeProduct["position"]
        }
    },
    AdminThunkProps
>("admin/home-product/edit", async ({id, data}) => {
    //
    const response = await apiRequest("patch", `admin/home-product/${id}`, {data})
    response && message({type: "success", content: "Вы успешно изменили продукт!"})
    return response
})

export const deleteHomeProduct = createAsyncThunk<HomeProduct["id"], HomeProduct["id"], AdminThunkProps>(
    "admin/home-product/delete",
    async id => {
        //
        const response = await apiRequest("delete", `admin/home-product/${id}`)
        response && message({type: "success", content: "Вы успешно удалили продукт с главной страницы!"})
        return id
    }
)
