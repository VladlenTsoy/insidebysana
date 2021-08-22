import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {PrintImage} from "./PrintImage"
import {StoreState} from "../../../store"
import {fetchPrintImages} from "./fetchPrintImages"
import {createPrintImage} from "./createPrintImage"
import {editPrintImage} from "./editPrintImage"
import {deletePrintImage} from "./deletePrintImage"

export const printImageAdapter = createEntityAdapter<PrintImage>()

export interface StateProps {
    loading: boolean
}

const initialState = printImageAdapter.getInitialState<StateProps>({
    loading: true
})

const printImageSlice = createSlice({
    name: "print-image",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Создание
        builder.addCase(createPrintImage.fulfilled, (state, action) => {
            printImageAdapter.addOne(state, action.payload)
        })
        // Редактирование
        builder.addCase(editPrintImage.fulfilled, (state, action) => {
            printImageAdapter.upsertOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deletePrintImage.fulfilled, (state, action) => {
            printImageAdapter.removeOne(state, action.payload)
        })
        // Вывод всех
        builder.addCase(fetchPrintImages.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPrintImages.fulfilled, (state, action) => {
            printImageAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchPrintImages.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll} = printImageAdapter.getSelectors<StoreState>(state => state.printImage)

export default printImageSlice.reducer
