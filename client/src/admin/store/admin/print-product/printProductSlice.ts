import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {PrintProduct} from "./PrintProduct"
import {StoreState} from "../../../store"
import {fetchPrintProductsByImageId} from "./fetchPrintProductsByImageId"
import {createPrintProduct} from "./createPrintProduct"
import {editPrintProduct} from "./editPrintProduct"
import {deletePrintProduct} from "./deletePrintProduct"

export const printProductAdapter = createEntityAdapter<PrintProduct>()

export interface StateProps {
    loading: boolean
}

const initialState = printProductAdapter.getInitialState<StateProps>({
    loading: false
})

const printProductSlice = createSlice({
    name: "print-product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание
        builder.addCase(createPrintProduct.fulfilled, (state, action) => {
            printProductAdapter.addOne(state, action.payload)
        })
        // Редактирование
        builder.addCase(editPrintProduct.fulfilled, (state, action) => {
            printProductAdapter.upsertOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deletePrintProduct.fulfilled, (state, action) => {
            printProductAdapter.removeOne(state, action.payload)
        })
        // Вывод всех
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

export const {selectAll} = printProductAdapter.getSelectors<StoreState>(state => state.printProduct)

export default printProductSlice.reducer
