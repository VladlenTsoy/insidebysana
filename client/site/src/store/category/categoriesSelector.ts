import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllCategories} from "./categorySlice"

// Загрузка
export const useLoadingCategories = () => useSelector((state: StoreState) => state.category.loading)

// Вывод всех цветов
export const useSelectAllCategories = () => useSelector(selectAllCategories)
