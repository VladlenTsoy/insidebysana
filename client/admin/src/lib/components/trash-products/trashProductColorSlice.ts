import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {ProductColor} from "../../types/product/ProductColor"
import {AdminState} from "../../../store/admin/store"
import {fetchProductColorsFromTrash} from "./fetchProductColorsFromTrash"
import {returnProductColorFromTrash} from "./return-item/returnProductColorFromTrash"
import {deleteProductColorFromTrash} from "./delete-item/deleteProductColorFromTrash"

export const trashProductColorAdapter = createEntityAdapter<ProductColor>({
    sortComparer: false
})

export interface StateProps {
    loading: boolean
}

const initialState = trashProductColorAdapter.getInitialState<StateProps>({
    loading: false
})

const trashProductColorSlice = createSlice({
    name: "trash-product-color",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод
        builder.addCase(fetchProductColorsFromTrash.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProductColorsFromTrash.fulfilled, (state, action) => {
            trashProductColorAdapter.addMany(state, action.payload)
            state.loading = false
        })
        // Вернуть
        builder.addCase(returnProductColorFromTrash.fulfilled, (state, action) => {
            trashProductColorAdapter.removeOne(state, action.payload)
        })
        // Удаление
        builder.addCase(deleteProductColorFromTrash.fulfilled, (state, action) => {
            trashProductColorAdapter.removeOne(state, action.payload)
        })
    }
})

export const {
    selectAll: selectAllTrashProductColors
} = trashProductColorAdapter.getSelectors<AdminState>(state => state.trashProductColor)

export default trashProductColorSlice.reducer
