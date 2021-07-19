import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductColor} from "../../../lib/types/product/ProductColor"
import {AdminState} from "../store"
import {fetchProductColors} from "./fetchProductColors"
import {createProduct} from "../product/createProduct"
import {editProduct} from "../product/editProduct"
import {updateDiscount} from "./updateDiscount"
import {hideProductColor} from "./hideProductColor"

export const productColorAdapter = createEntityAdapter<ProductColor>({
    sortComparer: false
})

export interface StateProps {
    loading: boolean
    search: string,
    categoryId: number
    sorter: {field: string, order: string}
    pagination: {current: number, pageSize: number}
}

const initialState = productColorAdapter.getInitialState<StateProps>({
    loading: false,
    search: "",
    categoryId: 0,
    sorter: {field: "created_at", order: "descend"},
    pagination: {current: 1, pageSize: 10}
})

const productColorSlice = createSlice({
    name: "productColor",
    initialState,
    reducers: {
        changeSearch: (state, action: PayloadAction<StateProps['search']>) => {
            state.search = action.payload
        },
        changeCategoryId: (state, action: PayloadAction<StateProps['categoryId']>) => {
            state.categoryId = action.payload
        },
        changeSorter: (state, action: PayloadAction<StateProps['sorter']>) => {
            state.sorter = action.payload
        },
        changePagination: (state, action: PayloadAction<StateProps['pagination']>) => {
            state.pagination = action.payload
        }
    },
    extraReducers: builder => {
        // Вывод всех продуктов-цветов пагинация
        builder.addCase(fetchProductColors.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProductColors.fulfilled, (state, action) => {
            productColorAdapter.setAll(state, action.payload.results)
            state.loading = false
        })
        builder.addCase(fetchProductColors.rejected, state => {
            state.loading = false
        })

        //
        builder.addCase(createProduct.fulfilled, (state, action) => {
            productColorAdapter.addMany(state, action.payload.productColors)
        })

        //
        builder.addCase(editProduct.fulfilled, (state, action) => {
            productColorAdapter.upsertMany(state, action.payload.productColors)
        })

        //
        builder.addCase(updateDiscount.pending, state => {
            state.loading = true
        })
        builder.addCase(updateDiscount.fulfilled, (state, action) => {
            productColorAdapter.upsertOne(state, action.payload)
            state.loading = false
        })
        builder.addCase(updateDiscount.rejected, state => {
            state.loading = false
        })

        //
        builder.addCase(hideProductColor.fulfilled, (state, action) => {
            productColorAdapter.removeOne(state, action.payload)
        })
    }
})

export const {changeCategoryId, changePagination, changeSearch, changeSorter} = productColorSlice.actions

export const {
    selectById: getProductColorById,
    selectAll: selectAllProductColors
} = productColorAdapter.getSelectors<AdminState>(state => state.productColor)

export default productColorSlice.reducer
