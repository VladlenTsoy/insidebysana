import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductColorCard} from "../../types/productColor"
import {Category} from "../../types/category"
import {Size} from "../../types/size"
import {fetchProductCards} from "./fetchProductCards"
import {StoreState} from "../store"
import {Color} from "../../types/color"

export const productCardAdapter = createEntityAdapter<ProductColorCard>()

export interface StateProps {
    loading: boolean
    filterCategories: Category[]
    filterSizes: Size[]
    filterColors: Color[]
    filterPrice: {
        min: number,
        max: number
    },
    currentFilterCategories: Category['id'][]
    currentFilterSizes: Size['id'][]
    currentFilterColors: Color['id'][]
    currentFilterPrice: {
        min: number,
        max: number
    }
}

const initialState = productCardAdapter.getInitialState<StateProps>({
    loading: true,
    filterCategories: [],
    filterSizes: [],
    filterColors: [],
    filterPrice: {min: 0, max: 0},
    currentFilterCategories: [],
    currentFilterSizes: [],
    currentFilterColors: [],
    currentFilterPrice: {min: 0, max: 0}
})

const productCardSlice = createSlice({
    name: "product-card",
    initialState,
    reducers: {
        changeCurrentFilterCategories: (state, action: PayloadAction<StateProps['currentFilterCategories']>) => {
            state.currentFilterCategories = action.payload
        },
        changeCurrentFilterSizes: (state, action: PayloadAction<StateProps['currentFilterSizes']>) => {
            state.currentFilterSizes = action.payload
        },
        changeCurrentFilterColors: (state, action: PayloadAction<StateProps['currentFilterColors']>) => {
            state.currentFilterColors = action.payload
        },
        changeCurrentFilterPrice: (state, action: PayloadAction<StateProps['currentFilterPrice']>) => {
            state.currentFilterPrice = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductCards.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProductCards.fulfilled, (state, action) => {
            productCardAdapter.setAll(state, action.payload.products)
            state.filterCategories = action.payload.categories
            state.filterSizes = action.payload.sizes
            state.filterColors = action.payload.colors
            state.filterPrice = action.payload.price
            state.loading = false
        })
        builder.addCase(fetchProductCards.rejected, state => {
            state.loading = false
        })
    }
})

export const {changeCurrentFilterCategories, changeCurrentFilterColors, changeCurrentFilterPrice, changeCurrentFilterSizes} = productCardSlice.actions

export const {selectAll: selectAllProductCards} =
    productCardAdapter.getSelectors<StoreState>(state => state.productCard)

export default productCardSlice.reducer