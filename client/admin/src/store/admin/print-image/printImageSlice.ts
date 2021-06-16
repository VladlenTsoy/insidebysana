import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {PrintImage} from "./PrintImage"
import {AdminState} from "../store"
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
        // Создание баннера
        builder.addCase(createPrintImage.fulfilled, (state, action) => {
            printImageAdapter.addOne(state, action.payload)
        })
        // Редактирование баннера
        builder.addCase(editPrintImage.fulfilled, (state, action) => {
            printImageAdapter.upsertOne(state, action.payload)
        })
        // Удаление баннера
        builder.addCase(deletePrintImage.fulfilled, (state, action) => {
            printImageAdapter.setAll(state, action.payload)
        })
        // Вывод всех баннеров
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

export const {selectAll} = printImageAdapter.getSelectors<AdminState>(state => state.printImage)

export default printImageSlice.reducer
