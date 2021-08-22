import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Product} from "../../../lib/types/product/Product"
import {StoreState} from "../../../store"
import {fetchProductById} from "./fetchProductById"
import {editProduct} from "./editProduct"
import {createProduct} from "./createProduct"

export const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.basic.id,
    sortComparer: (a, b) => a.id < b.id ? 1 : -1
})

export interface StateProps {
    loading: boolean
}

const initialState = productAdapter.getInitialState<StateProps>({
    loading: false
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод продукта
        builder.addCase(fetchProductById.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchProductById.rejected, state => {
            state.loading = false
        })
        // Редактирование продукта
        builder.addCase(editProduct.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload.product)
        })
        // Создание продукта
        builder.addCase(createProduct.fulfilled, (state, action) => {
            productAdapter.addOne(state, action.payload.product)
        })
    }
})

export const {
    selectById: getProductById,
    selectAll: selectAllProducts
} = productAdapter.getSelectors<StoreState>(state => state.product)

export default productSlice.reducer
