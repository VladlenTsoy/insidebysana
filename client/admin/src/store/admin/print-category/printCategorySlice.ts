import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {PrintCategory} from "./PrintCategory"
import {AdminState} from "../store"
import {fetchPrintCategories} from "./fetchPrintCategories"
import {createPrintCategory} from "./createPrintCategory"
import {editPrintCategory} from "./editPrintCategory"
import {deletePrintCategory} from "./deleteCategory"

export const printCategoryAdapter = createEntityAdapter<PrintCategory>()

export interface StateProps {
    loading: boolean
}

const initialState = printCategoryAdapter.getInitialState<StateProps>({
    loading: true
})

const printCategorySlice = createSlice({
    name: "print-category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание баннера
        builder.addCase(createPrintCategory.fulfilled, (state, action) => {
            printCategoryAdapter.addOne(state, action.payload)
        })
        // Редактирование баннера
        builder.addCase(editPrintCategory.fulfilled, (state, action) => {
            printCategoryAdapter.upsertOne(state, action.payload)
        })
        // Удаление баннера
        builder.addCase(deletePrintCategory.fulfilled, (state, action) => {
            printCategoryAdapter.setAll(state, action.payload)
        })
        // Вывод всех баннеров
        builder.addCase(fetchPrintCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPrintCategories.fulfilled, (state, action) => {
            printCategoryAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchPrintCategories.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll} = printCategoryAdapter.getSelectors<AdminState>(state => state.printCategory)

export default printCategorySlice.reducer
