import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {createProductStorage} from "./createProductStorage"
import {StoreState} from "../../../store"
import {fetchProductStorage} from "./fetchProductStorage"
import {editProductStorage} from "./editProductStorage"
import {ProductStorage} from "../../../../types/product/ProductStorage"

export const productStorageAdapter = createEntityAdapter<ProductStorage>()

export interface StateProps {
  loading: boolean
}

const initialState = productStorageAdapter.getInitialState<StateProps>({
  loading: true
})

const productStorageSlice = createSlice({
  name: "source",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Создание ресурса
    builder.addCase(createProductStorage.pending, state => {
      state.loading = true
    })
    builder.addCase(createProductStorage.fulfilled, (state, action) => {
      productStorageAdapter.addOne(state, action.payload)
      state.loading = false
    })
    builder.addCase(createProductStorage.rejected, state => {
      state.loading = false
    })
    // Редактирование ресурса
    builder.addCase(editProductStorage.pending, state => {
      state.loading = true
    })
    builder.addCase(editProductStorage.fulfilled, (state, action) => {
      productStorageAdapter.upsertOne(state, action.payload)
      state.loading = false
    })
    builder.addCase(editProductStorage.rejected, state => {
      state.loading = false
    })
    // Вывод всех ресурсов
    builder.addCase(fetchProductStorage.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProductStorage.fulfilled, (state, action) => {
      productStorageAdapter.upsertMany(state, action.payload)
      state.loading = false
    })
    builder.addCase(fetchProductStorage.rejected, state => {
      state.loading = false
    })
  }
})

export const {selectById, selectAll} = productStorageAdapter.getSelectors<StoreState>(state => state.productStorage)

export default productStorageSlice.reducer
