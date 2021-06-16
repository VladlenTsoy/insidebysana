import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {StoreState} from "../store"
import {fetchProductById} from "./fetchProductById"
import {ProductColor} from "../../types/productColor"

export const productAdapter = createEntityAdapter<ProductColor>()

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
    }
})

export const {selectById: getProductById} = productAdapter.getSelectors<StoreState>(
    state => state.product
)

export default productSlice.reducer