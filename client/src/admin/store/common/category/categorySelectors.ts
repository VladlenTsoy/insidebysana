import {useSelector} from "react-redux"
import {CommonState} from "../store"
import {selectAllCategories} from "./categorySlice"

// Загрузка
export const useLoadingCategory = () => useSelector((state: CommonState) => state.category.loading)

// Вывод всех категорий
export const useSelectAllCategories = () => useSelector(selectAllCategories)
