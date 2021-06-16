import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Category} from "../../../lib/types/Category"
import {createCategory} from "../../admin/category/createCategory"
import {fetchCategories} from "./fetchCategories"
import {editCategory} from "../../admin/category/editCategory"
import {deleteCategory} from "../../admin/category/deleteCategory"
import {CommonState} from "../store"

export const categoryAdapter = createEntityAdapter<Category>()

export interface StateProps {
    loading: boolean
}

const initialState = categoryAdapter.getInitialState<StateProps>({
    loading: true
})

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание категории
        builder.addCase(createCategory.fulfilled, (state, action) => {
            categoryAdapter.upsertOne(state, action.payload)
        })
        // Изменение категории
        builder.addCase(editCategory.fulfilled, (state, action) => {
            categoryAdapter.upsertOne(state, action.payload)
        })
        // Удаление категории
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            categoryAdapter.setAll(state, action.payload)
        })
        // Вывод всех категорий
        builder.addCase(fetchCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            categoryAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchCategories.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllCategories} = categoryAdapter.getSelectors<CommonState>(
    state => state.category
)

export default categorySlice.reducer
