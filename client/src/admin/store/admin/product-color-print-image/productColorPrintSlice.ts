import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {ProductColorPrint} from "../../../lib/types/product/ProductColorPrint"
import {fetchPrintImage} from "./fetchPrintImage"
import {uploadPrintImage} from "./uploadPrintImage"
import {StoreState} from "../../../store"
import {deletePrintImage} from "./deletePrintImage";

export const productColorPrintAdapter = createEntityAdapter<ProductColorPrint>({
    sortComparer: false
})

export interface StateProps {
    loading: boolean
}

const initialState = productColorPrintAdapter.getInitialState<StateProps>({
    loading: false
})

const productColorPrintSlice = createSlice({
    name: "product-color-print",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Удаление картинки
        builder.addCase(deletePrintImage.fulfilled, (state, action) => {
            productColorPrintAdapter.removeOne(state, action.payload)
        })
        // Загрузка картинки
        builder.addCase(uploadPrintImage.fulfilled, (state, action) => {
            productColorPrintAdapter.addOne(state, action.payload)
        })
        // Загрука картинок
        builder.addCase(fetchPrintImage.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPrintImage.fulfilled, (state, action) => {
            state.loading = false
            productColorPrintAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchPrintImage.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllPrints} = productColorPrintAdapter.getSelectors<StoreState>(state => state.print)

export default productColorPrintSlice.reducer
