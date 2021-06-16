import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllProductCards} from "./productCardSlice"

// Загрузка
export const useLoadingProductCards = () => useSelector((state: StoreState) => state.productCard.loading)

// Размеры
export const useFilterSizes = () => useSelector((state: StoreState) => state.productCard.filterSizes)

// Цвета
export const useFilterColors = () => useSelector((state: StoreState) => state.productCard.filterColors)

// Категории
export const useFilterCategories = () => useSelector((state: StoreState) => state.productCard.filterCategories)

// Цены
export const useFilterPrice = () => useSelector((state: StoreState) => state.productCard.filterPrice)

// Текущия Фильтрация
export const useCurrentFilter = () => useSelector((state: StoreState) => ({
    price: state.productCard.currentFilterPrice,
    sizeIds: state.productCard.currentFilterSizes,
    subCategoryIds: state.productCard.currentFilterCategories,
    colorIds: state.productCard.currentFilterColors,
}))

// Вывод всех цветов
export const useSelectAllProductCards = () => useSelector(selectAllProductCards)