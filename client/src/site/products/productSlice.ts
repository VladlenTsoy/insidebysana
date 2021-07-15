import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductColorCard} from "types/productColor"
import {Category} from "types/Category"
import {Size} from "types/Size"
import {fetchProductsByFilter} from "./fetchProductsByFilter"
import {StoreState} from "../store"
import {Color} from "types/Color"
import {useSelector} from "react-redux"

export const productAdapter = createEntityAdapter<ProductColorCard>()

export interface StateProps {
    loading: boolean
    filterCategories: Category[]
    filterSizes: Size[]
    filterColors: Color[]
    filterPrice: {
        min: number
        max: number
    }
    currentFilterCategories: Category["id"][]
    currentFilterSizes: Size["id"][]
    currentFilterColors: Color["id"][]
    currentFilterPrice: {
        min: number
        max: number
    }
}

const initialState = productAdapter.getInitialState<StateProps>({
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

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        changeCurrentFilterCategories: (
            state,
            action: PayloadAction<StateProps["currentFilterCategories"]>
        ) => {
            state.currentFilterCategories = action.payload
        },
        changeCurrentFilterSizes: (state, action: PayloadAction<StateProps["currentFilterSizes"]>) => {
            state.currentFilterSizes = action.payload
        },
        changeCurrentFilterColors: (state, action: PayloadAction<StateProps["currentFilterColors"]>) => {
            state.currentFilterColors = action.payload
        },
        changeCurrentFilterPrice: (state, action: PayloadAction<StateProps["currentFilterPrice"]>) => {
            state.currentFilterPrice = action.payload
        },
        resetFilter: state => {
            state.currentFilterCategories = []
            state.currentFilterSizes = []
            state.currentFilterColors = []
            state.currentFilterPrice = {min: 0, max: 0}
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductsByFilter.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload.products)
            state.filterCategories = action.payload.categories
            state.filterSizes = action.payload.sizes
            state.filterColors = action.payload.colors
            state.filterPrice = action.payload.price
            state.loading = false
        })
        builder.addCase(fetchProductsByFilter.rejected, state => {
            state.loading = false
        })
    }
})

export const {
    changeCurrentFilterCategories,
    changeCurrentFilterColors,
    changeCurrentFilterPrice,
    changeCurrentFilterSizes,
    resetFilter
} = productSlice.actions

export const {selectAll: selectAllProducts} = productAdapter.getSelectors<StoreState>(state => state.product)

export default productSlice.reducer

// Загрузка
export const useLoadingProducts = () => useSelector((state: StoreState) => state.product.loading)

// Размеры
export const useFilterSizes = () => useSelector((state: StoreState) => state.product.filterSizes)

// Цвета
export const useFilterColors = () => useSelector((state: StoreState) => state.product.filterColors)

// Категории
export const useFilterCategories = () => useSelector((state: StoreState) => state.product.filterCategories)

// Цены
export const useFilterPrice = () => useSelector((state: StoreState) => state.product.filterPrice)

// Текущия Фильтрация
export const useCurrentFilter = () =>
    useSelector((state: StoreState) => ({
        price: state.product.currentFilterPrice,
        sizeIds: state.product.currentFilterSizes,
        subCategoryIds: state.product.currentFilterCategories,
        colorIds: state.product.currentFilterColors
    }))

// Вывод всех цветов
export const useSelectAllProducts = () => useSelector(selectAllProducts)
