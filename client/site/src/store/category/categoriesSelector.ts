import {useSelector} from "react-redux"
import {StoreState} from "../store"
import {selectAllCategories, selectById} from "./categorySlice"

// Загрузка
export const useLoadingCategories = () => useSelector((state: StoreState) => state.category.loading)

// Вывод всех цветов
export const useSelectAllCategories = () => useSelector(selectAllCategories)

// Вывод категории по ID
export const useSelectCategoryById = (id: string) => useSelector((state: StoreState) => selectById(state, id))
