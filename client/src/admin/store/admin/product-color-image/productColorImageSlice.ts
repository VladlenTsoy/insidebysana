import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchImages} from "./fetchImages"
import {uploadImage} from "./uploadImage"
import {StoreState} from "../../../store"
import {deleteImage} from "./deleteImage"
import {ProductColorImage} from "../../../lib/types/ProductColorImage"

export const productColorImageAdapter = createEntityAdapter<ProductColorImage>({
    sortComparer: false
})

export interface StateProps {
    loading: boolean
}

const initialState = productColorImageAdapter.getInitialState<StateProps>({
    loading: false
})

const productColorImageSlice = createSlice({
    name: "product-color-image",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Удаление картинки
        builder.addCase(deleteImage.fulfilled, (state, action) => {
            productColorImageAdapter.removeOne(state, action.payload)
        })
        // Загрузка картинки
        builder.addCase(uploadImage.fulfilled, (state, action) => {
            productColorImageAdapter.addOne(state, action.payload)
        })
        // Загрука картинок
        builder.addCase(fetchImages.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.loading = false
            productColorImageAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchImages.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllImages} = productColorImageAdapter.getSelectors<StoreState>(state => state.productColorImage)

export default productColorImageSlice.reducer
