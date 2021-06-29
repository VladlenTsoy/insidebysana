import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {PrintProduct} from "./PrintProduct"
import {AdminState} from "../store"
import {fetchPrintProductsByImageId} from "./fetchPrintProductsByImageId"
import {createPrintProduct} from "./createPrintProduct"
import {editPrintProduct} from "./editPrintProduct"
import {deletePrintProduct} from "./deletePrintProduct"

export const printProductAdapter = createEntityAdapter<PrintProduct>()

export interface StateProps {
    loading: boolean
}

const initialState = printProductAdapter.getInitialState<StateProps>({
    loading: true
})

const printProductSlice = createSlice({
    name: "print-product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание баннера
        builder.addCase(createPrintProduct.fulfilled, (state, action) => {
            printProductAdapter.addOne(state, action.payload)
        })
        // Редактирование баннера
        builder.addCase(editPrintProduct.fulfilled, (state, action) => {
            printProductAdapter.upsertOne(state, action.payload)
        })
        // Удаление баннера
        builder.addCase(deletePrintProduct.fulfilled, (state, action) => {
            printProductAdapter.setAll(state, action.payload)
        })
        // Вывод всех баннеров
        builder.addCase(fetchPrintProductsByImageId.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPrintProductsByImageId.fulfilled, (state, action) => {
            printProductAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchPrintProductsByImageId.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll} = printProductAdapter.getSelectors<AdminState>(state => state.printProduct)

export default printProductSlice.reducer
