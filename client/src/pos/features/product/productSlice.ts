import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {StoreState} from "pos/store"
import {useSelector} from "react-redux"
import {ProductCardType} from "./product"
import {fetchProductColorBySearch} from "./fetchProductColorBySearch"

export const productAdapter = createEntityAdapter<ProductCardType>()

export interface StateProps {
    loading: boolean
    category_id: number
    size_id: number
    search?: string
    pagination: {
        currentPage: number
        limit: number
        total: number
    }
}

const initialState = productAdapter.getInitialState<StateProps>({
    loading: false,
    category_id: 0,
    size_id: 0,
    pagination: {currentPage: 0, limit: 18, total: 0},
    search: undefined
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Изменить Категорию для фильтации
        changeCategoryId: (state, action: PayloadAction<StateProps["category_id"]>) => {
            state.category_id = action.payload
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        },
        // Изменить Размер для фильтрации
        changeSizeId: (state, action: PayloadAction<StateProps["size_id"]>) => {
            state.size_id = action.payload
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        },
        // Сбросить фильтрацию категорию и размер
        resetCategoryIdAndSizeId: (
            state,
            action: PayloadAction<{categoryId: StateProps["category_id"]; sizeId: StateProps["size_id"]}>
        ) => {
            state.category_id = action.payload.categoryId
            state.size_id = action.payload.sizeId
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        },
        // Изменения пагинации
        changeCurrentPage: (state, action: PayloadAction<StateProps["pagination"]["currentPage"]>) => {
            state.pagination.currentPage = action.payload
        },
        // Изменения поиска
        changeSearch: (state, action: PayloadAction<StateProps["search"]>) => {
            state.search = action.payload
            state.pagination = initialState.pagination
            productAdapter.removeAll(state)
        }
    },
    extraReducers: builder => {
        // Загрузка продуктов
        builder.addCase(fetchProductColorBySearch.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchProductColorBySearch.fulfilled, (state, action) => {
            productAdapter.addMany(state, action.payload.results)
            state.pagination.total = action.payload.total
            state.loading = false
        })
    }
})

export const {
    changeCategoryId,
    changeSizeId,
    resetCategoryIdAndSizeId,
    changeCurrentPage,
    changeSearch
} = productSlice.actions

export const {selectAll} = productAdapter.getSelectors<StoreState>(state => state.product)

export default productSlice.reducer

// Вывод Категории для фильтрации
export const useCategoryIdPos = () => useSelector((state: StoreState) => state.product.category_id)

// Вывод размера для фильтрации
export const useSizeIdPos = () => useSelector((state: StoreState) => state.product.size_id)

// Вывод пагинации
export const useProductPaginationPos = () => useSelector((state: StoreState) => state.product.pagination)

// Вывод продукта
export const useProductColors = () => useSelector(selectAll)

// Вывод загрузки
export const useLoadingProductColors = () => useSelector((state: StoreState) => state.product.loading)

// Вывод поиска
export const useGetFilterSearch = () => useSelector((state: StoreState) => state.product.search)

// Вывод продукта по Id
export const useGetProductColorById = (id: number) =>
    useSelector((state: StoreState) => state.product.entities[id])
