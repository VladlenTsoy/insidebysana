import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {StoreState} from "admin/store"
import {useSelector} from "react-redux"
import {fetchHomeProducts, deleteHomeProduct, createHomeProduct, editHomeProduct} from "./homeProductApi"

export interface HomeProduct {
    id: number
    product_color_id: number | string
    position: number
    title: string
    url_thumbnail: string
    price: number
    color_title: string
}

export const homeProductAdapter = createEntityAdapter<HomeProduct>()

export interface StateProps {
    loading: boolean
}

const initialState = homeProductAdapter.getInitialState<StateProps>({
    loading: true
})

const homeProductSlice = createSlice({
    name: "homeProduct",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание
        builder.addCase(createHomeProduct.fulfilled, (state, action) => {
            homeProductAdapter.addOne(state, action.payload)
        })
        // Изменить
        builder.addCase(editHomeProduct.fulfilled, (state, action) => {
            homeProductAdapter.setOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deleteHomeProduct.fulfilled, (state, action) => {
            homeProductAdapter.removeOne(state, action.payload)
        })
        // Вывод всех
        builder.addCase(fetchHomeProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchHomeProducts.fulfilled, (state, action) => {
            homeProductAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchHomeProducts.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll} = homeProductAdapter.getSelectors<StoreState>(state => state.homeProduct)

// Загрузка
export const useLoadingHomeProducts = () => useSelector((state: StoreState) => state.homeProduct.loading)

// Вывод всех
export const useSelectAllHomeProducts = () => useSelector(selectAll)

export default homeProductSlice.reducer
