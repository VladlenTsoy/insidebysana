import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {ProductColorCard} from "../../types/productColor"
import {fetchNewProducts} from "./fetchNewProducts"
import {StoreState} from "../store"

export const newProductAdapter = createEntityAdapter<ProductColorCard>()


export interface StateProps {
    loading: boolean
}

const initialState = newProductAdapter.getInitialState<StateProps>({
    loading: true
})

const newProductSlice = createSlice({
    name: "new-product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNewProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchNewProducts.fulfilled, (state, action) => {
            newProductAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchNewProducts.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectAll: selectAllNewProduct} =
    newProductAdapter.getSelectors<StoreState>(state => state.newProduct)

export default newProductSlice.reducer